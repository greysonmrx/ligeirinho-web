import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../context/AuthContext';

import { Container, Content, Background, Wrapper, Top } from './styles';

import logoImg from '../../assets/images/logo_extended.svg';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('E-mail inválido.')
            .required('O e-mail é obrigatório.'),
          password: Yup.string()
            .min(6, 'No mínimo 6 dígitos.')
            .required('A senha é obrigatória.'),
        });

        await schema.validate({ email, password }, { abortEarly: false });

        formRef.current?.setErrors({});

        signIn({ email, password });
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <Wrapper>
          <img src={logoImg} alt="Ligeirinho" />
          <Top>
            <h1>Faça seu login.</h1>
            <p>
              Entre com seus dados que você inseriu durante seu registro para
              entrar no sistema.
            </p>
          </Top>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              label="Endereço de e-mail"
              placeholder="Insira seu e-mail"
            />
            <Input
              name="password"
              type="password"
              label="Senha secreta"
              placeholder="Insira sua senha"
            />
            <Button loading={false} type="submit">
              Vamos lá!
            </Button>
            <p>
              Ainda não possui uma conta?
              <a href="signup"> Crie agora!</a>
            </p>
          </Form>
        </Wrapper>
        <span>© 2020 Ligeirinho Entregas. Todos os direitos reservados.</span>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
