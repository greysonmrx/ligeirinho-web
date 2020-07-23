import { keyframes } from 'styled-components';

export const loading = keyframes`
  0% {
    opacity: .2;
    transform: scale(1, 1);
  }

  50% {
    opacity: 1;
    transform: scale(1.2, 1.2);
  }

  100% {
    opacity: .2;
    transform: scale(1, 1);
  }
`;
