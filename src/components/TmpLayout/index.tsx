import React from 'react';
import Header from '../Header';
import * as Styled from './styledLayout';

interface ILayoutProps {
  children: React.ReactElement;
}
const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Header />
      <Styled.Container>
        <Styled.Main>
          <div>{children}</div>
        </Styled.Main>
      </Styled.Container>
    </>
  );
};

export default Layout;
