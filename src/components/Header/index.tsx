import React from 'react';
import * as Styled from './styledHeader';
import Link from 'next/link';
import logo from '../../assets/logo.png';
import { useRouter } from 'next/router';
import useSnackbar from '@/hooks/useSnackbar';
import Button from '../Button';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { showSnackbar } = useSnackbar();
  const handleLogout = () => {
    signOut();
    showSnackbar('已登出');
    router.push(`/`);
  };
  return (
    <Styled.Header>
      <Link href="/">
        <Styled.Logo src={logo.src} />
      </Link>
      {session ? (
        <Styled.RightBox>
          <Styled.Account>{session.user?.name}</Styled.Account>
          <Button onClick={handleLogout}>logout</Button>
        </Styled.RightBox>
      ) : (
        <Link href="/login">
          <Button>login</Button>
        </Link>
      )}
    </Styled.Header>
  );
};

export default Header;
