import styled from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
}

interface InputContainerProps {
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  & + div {
    margin-top: 25px;
  }

  p {
    margin-bottom: 8px;
    font-weight: 600;
    color: ${({ isFocused }) => (isFocused ? '#3C404A' : '#7F848F')};
  }
`;

export const InputContainer = styled.div<InputContainerProps>`
  width: 100%;
  height: 56px;
  border: 3px solid ${({ isFocused }) => (isFocused ? '#E02041' : '#dcdcdc')};
  border-radius: 5px;
  background-color: #ffffff;
  transition: border 0.2s;
`;

export const TextInput = styled.input`
  width: 100%;
  height: 100%;
  -webkit-appearance: none;
  padding: 15px;
  font-weight: 500;
  border: none;
  color: #3c404a;

  &::placeholder {
    color: #bcbcbc;
  }
`;

export const TextError = styled.span``;
