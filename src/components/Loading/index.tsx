import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
`;

const loaderAnimation = keyframes`
  0%{
      transform: rotate(0deg);
  }
  25%{
      transform: rotate(90deg);
  }
  50%{
      transform: rotate(180deg);
  }
  75%{
      transform: rotate(270deg);
  }
  100%{
      transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  span {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 5px solid #bbb;
    border-top: 5px solid #5862ef;
    animation: ${loaderAnimation} 1s linear infinite;
  }
`;

const Loading = () => {
  return (
    <>
      <Container>
        <Background />
        <Loader>
          <span></span>
        </Loader>
      </Container>
    </>
  );
};

export default Loading;
