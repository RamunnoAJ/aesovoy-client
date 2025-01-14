import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login, refreshToken } from "./service/auth";
import { DefaultJWT } from "next-auth/jwt";

const THREE_DAYS_IN_MS = 86400 * 3;

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      email: string;
      role: string;
      id: number;
      expires: string;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    role: string;
    expires: string;
  }

  interface JWT extends DefaultJWT {
    accessToken: string;
    refreshToken: string;
    role: string;
    id: number;
    expires: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) return null;
        try {
          const response = await login(
            credentials.email as string,
            credentials.password as string,
          );

          if (response && response.data) {
            const { user, access_token, refresh_token } = response.data;
            return {
              accessToken: access_token,
              refreshToken: refresh_token,
              expires: new Date(Date.now() + THREE_DAYS_IN_MS).toISOString(),
              email: user.email,
              id: user.id,
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
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        token.id = user.id;
        token.expires = user.expires;
      }

      if (token.expires && new Date(token.expires as string) < new Date()) {
        try {
          const refreshedTokens = await refreshToken(
            token.id as number,
            token.refreshToken as string,
          );

          return {
            ...token,
            accessToken: refreshedTokens.accessToken,
            refreshToken: refreshedTokens.refreshToken || token.refreshToken,
            expires: new Date(Date.now() + THREE_DAYS_IN_MS).toISOString(),
          };
        } catch (error) {
          console.error("Token refresh error:", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
        session.user.role = token.role as string;
        session.user.id = token.id as never;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    updateAge: THREE_DAYS_IN_MS,
  },
  pages: {},
});
