import React from 'react';
import Header from '../Header';
import * as Styled from './styledLayout';
import { SnackbarProvider } from '../../context/snackbarContext';

interface ILayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <SnackbarProvider>
        <Header />
        <Styled.Container>
          <Styled.Main>
            <div>{children}</div>
          </Styled.Main>
        </Styled.Container>
      </SnackbarProvider>
    </>
  );
};

export default Layout;
