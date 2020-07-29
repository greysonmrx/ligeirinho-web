import styled from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: calc(50% - 15px);

  p {
    margin-bottom: 8px;
    font-weight: 600;
    color: ${({ isFocused }) => (isFocused ? '#3C404A' : '#7F848F')};
  }
`;
