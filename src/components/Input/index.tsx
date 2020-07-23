import React, { useState, InputHTMLAttributes, useCallback } from 'react';

import { Container, InputContainer, TextInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  style?: React.CSSProperties;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  style,
  type = 'text',
  ...rest
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container style={style} isFocused={isFocused}>
      {label && <p>{label}</p>}
      <InputContainer isFocused={isFocused}>
        <TextInput
          type={type}
          {...rest}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </InputContainer>
    </Container>
  );
};

export default Input;
