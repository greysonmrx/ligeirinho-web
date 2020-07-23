import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  disabled: boolean;
  isLoading: number;
}

export const Container = styled.button<ContainerProps>`
  ${({ disabled, isLoading }) =>
    disabled || isLoading
      ? css`
          cursor: not-allowed;
          opacity: 0.5;
        `
      : css`
          &:hover {
            background: ${shade(0.2, '#e02041')};
          }
        `};
`;
