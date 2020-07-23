import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface TostProps {
  type?: 'success' | 'error' | 'warn' | 'info';
}

const toastTypeVariations = {
  info: css`
    span {
      background-color: #007bc2;
    }

    > svg {
      color: #007bc2;
    }
  `,
  success: css`
    span {
      background-color: #21a67a;
    }

    > svg {
      color: #21a67a;
    }
  `,
  error: css`
    span {
      background-color: #d80026;
    }

    > svg {
      color: #d80026;
    }
  `,
  warn: css`
    span {
      background-color: #f0a92e;
    }

    > svg {
      color: #f0a92e;
    }
  `,
};

export const Container = styled(animated.div) <TostProps>`
  width: fit-content;
  display: flex;
  height: 75px;
  align-items: center;
  position: relative;
  padding: 10px 15px 10px 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  background-color: #fafafc;

  ${({ type }) => toastTypeVariations[type || 'success']}

  & + div {
    margin-top: 8px;
  }

  span {
    width: 5px;
    height: 100%;
    border-radius: 2.5px;
  }

  > svg {
    font-size: 26px;
    margin: 0 12px;
  }

  div {
    strong {
      color: #282c36;
      font-weight: 600;
    }
    p {
      color: #7f848f;
      font-size: 15px;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
    outline: none;
    margin-left: 15px;

    svg {
      font-size: 20px;
      color: #a9abaf;
    }
  }
`;
