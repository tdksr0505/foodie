import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { doLogin } from '@/lib/api';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        account: { label: 'account', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.account && credentials?.password) {
          const result = await doLogin(credentials.account, credentials.password);
          if (result.code === 0) {
            return {
              id: result.data.id,
              account: result.data.account,
              name: result.data.name,
            };
          } else {
            throw new Error('登入失敗');
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);
