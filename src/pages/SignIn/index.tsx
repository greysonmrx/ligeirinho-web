import React from 'react';
import { Form } from '@unform/web';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, Wrapper, Top } from './styles';

import logoImg from '../../assets/images/logo_extended.svg';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  function handleSubmit({ email, password }: SignInFormData): void {
    console.log({ email, password });
  }

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
          <Form onSubmit={handleSubmit}>
            <Input
              name="email"
              type="email"
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
