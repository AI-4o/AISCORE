import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  secret: "qaf9KMaX39uOmvdgHqXEDhBd8lWFFZgPawD/kVrnlss=",
  pages: {
    signIn: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      let isOnCustomerArea = nextUrl.pathname.startsWith('/protected');

      if (isOnCustomerArea) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/protected', nextUrl));
      }
      return true;
    },
    redirect({ url, baseUrl }) {
      return baseUrl + '/protected';
    },
  },
} satisfies NextAuthConfig;