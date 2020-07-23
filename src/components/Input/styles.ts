import styled from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

interface InputContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  & + div {
    margin-top: 25px;
  }

  p {
    margin-bottom: 8px;
    font-weight: 600;
    color: ${({ isFocused }) => (isFocused ? '#3C404A' : '#7F848F')};
    color: ${({ isErrored }) => (isErrored ? '#e02041' : null)};
  }
`;

export const InputContainer = styled.div<InputContainerProps>`
  width: 100%;
  height: 56px;
  border: 3px solid ${({ isFocused }) => (isFocused ? '#E02041' : '#dcdcdc')};
  border-radius: 5px;
  background-color: ${({ isErrored }) => (isErrored ? '#FFF2F2' : '#ffffff')};
  transition: border 0.2s;
  border-color: ${({ isErrored }) => (isErrored ? '#e02041' : null)};

  input {
    color: ${({ isErrored }) => (isErrored ? '#e02041' : '#3c404a')};

    &::placeholder {
      color: ${({ isErrored }) => (isErrored ? '#e02041' : '#bcbcbc')};
    }
  }
`;

export const TextInput = styled.input`
  width: 100%;
  height: 100%;
  -webkit-appearance: none;
  padding: 15px;
  font-weight: 500;
  border: none;
  background: transparent;
`;

export const TextError = styled.p`
  margin: 8px 0 0 !important;
  font-weight: 500 !important;
`;
