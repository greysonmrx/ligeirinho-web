import React, {
  useEffect,
  useRef,
  useState,
  InputHTMLAttributes,
  useCallback,
} from 'react';
import { useField } from '@unform/core';

import { Container, InputContainer, TextInput, TextError } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  style?: React.CSSProperties;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  style,
  type = 'text',
  ...rest
}: InputProps) => {
  const inputRef = useRef(null);

  const [isFocused, setIsFocused] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container style={style} isFocused={isFocused} isErrored={!!error}>
      {label && <p>{label}</p>}
      <InputContainer isFocused={isFocused} isErrored={!!error}>
        <TextInput
          defaultValue={defaultValue}
          ref={inputRef}
          type={type}
          {...rest}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </InputContainer>
      {!!error && <TextError>{error}</TextError>}
    </Container>
  );
};

export default Input;
