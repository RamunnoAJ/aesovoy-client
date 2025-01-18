import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as authService from "./service/auth";
import { DefaultJWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      email: string;
      role: string;
      id: number;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    role: string;
  }

  interface JWT extends DefaultJWT {
    accessToken: string;
    refreshToken: string;
    role: string;
    id: number;
  }
}

async function refreshAccessToken(token: any): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        headers: {
          Authorization: `Bearer ${token.refreshToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Invalid refresh token");
    }

    const newTokens = await response.json();

    return {
      ...token,
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken ?? token.refreshToken,
    };
  } catch (e: any) {
    console.error(e.message);
    return null;
  }
}

export const {
  auth,
  handlers,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) return null;
        try {
          const response = await authService.login(
            credentials.email as string,
            credentials.password as string,
          );

          if (response && response.data) {
            const { user, access_token, refresh_token } = response.data;
            return {
              accessToken: access_token,
              refreshToken: refresh_token,
              email: user.email,
              id: Number(user.id),
              role: user.role,
            } as any;
          }
        } catch (e) {
          console.error("Authorization error:  ", e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    jwt: async ({ token, user, account }) => {
      if (token?.accessToken) {
        const decodedToken = jwtDecode(token.accessToken as string);
        token.accessTokenExpires = (decodedToken?.exp || 1) * 1000;
      }
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {},
});
