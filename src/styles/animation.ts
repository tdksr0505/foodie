import { keyframes } from 'styled-components';

export const fadeInUp = keyframes`
 0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);

  }
`;

export const fadeInRight = keyframes`
 0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);

  }
`;
