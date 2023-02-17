import React from 'react';
import * as Styled from './styledHeader';
import Link from 'next/link';
import logo from '../../assets/logo.png';
import Button from '../Button';

export default () => {
  return (
    <Styled.Header>
      <Link href="/">
        <Styled.Logo src={logo.src} />
      </Link>
      <Link href="/login">
        <Styled.LoginButotn>登入</Styled.LoginButotn>
      </Link>
    </Styled.Header>
  );
};
