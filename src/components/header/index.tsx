import React from 'react';
import * as Styled from './styledHeader';
import Link from 'next/link';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <Styled.Header>
      <Link href="/">
        <Styled.Logo src={logo.src} />
      </Link>
    </Styled.Header>
  );
};

export default Header;
