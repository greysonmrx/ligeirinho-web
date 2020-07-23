import React from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, Wrapper, Top } from './styles';

import logoImg from '../../assets/images/logo_extended.svg';

const SignIn: React.FC = () => {
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
          <form>
            <Input label="Endereço de e-mail" placeholder="Insira seu e-mail" />
            <Input label="Senha secreta" placeholder="Insira sua senha" />
            <Button loading={false}>Vamos lá!</Button>
            <p>
              Ainda não possui uma conta?
              <a href="signup"> Crie agora!</a>
            </p>
          </form>
        </Wrapper>
        <span>© 2020 Ligeirinho Entregas. Todos os direitos reservados.</span>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
