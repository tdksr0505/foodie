import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    account: string;
    name: string;
  }

  interface User {
    account: string;
    name: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    account: string;
    name: string;
  }
}
