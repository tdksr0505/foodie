import React from 'react';
import * as Styled from './styledHeader';
import Link from 'next/link';
import logo from '../../assets/logo.png';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import useSnackbar from '@/hooks/useSnackbar';
import Button from '../Button';

const Header = () => {
  const router = useRouter();
  const { user, logout, auth } = useAuth();
  const { showSnackbar } = useSnackbar();
  const handleLogout = () => {
    logout();
    showSnackbar('已登出');
    router.push(`/`);
  };
  return (
    <Styled.Header>
      <Link href="/">
        <Styled.Logo src={logo.src} />
      </Link>
      {auth ? (
        <Styled.RightBox>
          <Styled.Account>{user.name}</Styled.Account>
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
