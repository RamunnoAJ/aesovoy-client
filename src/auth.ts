import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import * as authService from "./service/auth";
import { DefaultJWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

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
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      async profile(profile) {
        const user = await authService.findUserByEmail(profile.email);

        if (!user || !user.data) {
          throw new Error("Email not found in the db");
        }

        return {
          id: user.data.id,
          email: user.data.email,
          name: profile.name,
          image: profile.picture,
          role: user.data.role,
          accessToken: user.data.access_token,
          refreshToken: user.data.refresh_token,
        };
      },
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
