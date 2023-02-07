import React from 'react';
import Header from '../Header';
import * as Styled from './styledLayout';

interface ILayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <div>
        <Header />
        <Styled.Container>
          <Styled.Main>
            <div>{children}</div>
          </Styled.Main>
        </Styled.Container>
      </div>
    </>
  );
};

export default Layout;
