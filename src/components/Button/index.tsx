import React, { ButtonHTMLAttributes } from 'react';

import DotsLoader from '../DotsLoader';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  isDisabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  isDisabled = false,
  ...rest
}: ButtonProps) => {
  return (
    <Container
      type="button"
      disabled={isDisabled}
      isLoading={Number(loading)}
      {...rest}
    >
      {loading ? <DotsLoader /> : children}
    </Container>
  );
};

export default Button;
