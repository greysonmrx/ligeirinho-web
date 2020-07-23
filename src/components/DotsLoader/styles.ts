import styled from 'styled-components';

import { loading } from './animations';

export const Container = styled.div`
  > div {
    animation: ${loading} 1.5s infinite ease-in-out;
    background-color: #ffffff;
    border-radius: 4.5px;
    display: inline-block;
    height: 9px;
    width: 9px;

    & + div {
      animation-delay: 0.5s;
      margin-left: 5px;

      & + div {
        animation-delay: 1s;
      }
    }
  }
`;
