import React, {
  useEffect,
  useRef,
  useState,
  InputHTMLAttributes,
  useCallback,
} from 'react';
import { useField } from '@unform/core';

import { Container, InputContainer, TextInput } from './styles';

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
    <Container style={style} isFocused={isFocused}>
      {label && <p>{label}</p>}
      <InputContainer isFocused={isFocused}>
        <TextInput
          defaultValue={defaultValue}
          ref={inputRef}
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
