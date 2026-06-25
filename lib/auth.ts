import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/drive.readonly',
          ].join(' '),
          access_type: 'offline',
          prompt: 'consent',
        },
      },
      checks: ['pkce'],
      issuer: 'https://accounts.google.com',
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // TODO: Remove @sambright.com and @practiceatscale.co before deploying to production
      if (!profile?.email?.endsWith('@tosi.com') && !profile?.email?.endsWith('@sambright.com') && !profile?.email?.endsWith('@practiceatscale.co')) {
        return false;
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at;
        token.email = profile?.email;
        token.name = profile?.name;
        token.picture = (profile as any)?.picture;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.image = token.picture as string;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
});
