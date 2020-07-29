import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import Header from '../../components/Header';
import Input from '../../components/Input';
import AvatarField from '../../components/AvatarInput';

import api from '../../services/api';

import { Deliveryman } from '../../interfaces/deliveryman';

import { useToast } from '../../hooks/toast';

import { Container, Wrapper, Content, Top, FormContainer } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface UpdateDeliveryManFormData {
  avatar?: string;
  name: string;
  email: string;
}

interface IState {
  deliveryman: Deliveryman;
}

const EditDeliveryMan: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { state } = useLocation();
  const { addToast } = useToast();

  const { deliveryman } = state as IState;

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleSubmit = useCallback(
    async ({ avatar, name, email }: UpdateDeliveryManFormData) => {
      try {
        const schema = Yup.object().shape({
          avatar: Yup.string(),
          name: Yup.string().required('O nome é obrigatório.'),
          email: Yup.string()
            .email('E-mail inválido.')
            .required('O e-mail é obrigatório.'),
        });

        await schema.validate({ avatar, name, email }, { abortEarly: false });

        await api.put(`/deliverymen/${deliveryman.id}`, {
          avatar_id: avatar,
          name,
          email,
        });

        formRef.current?.setErrors({});

        addToast({
          title: 'Tudo certo!',
          description: 'Entregador atualizado com sucesso.',
        });

        handleGoBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Ação não concluída!',
          type: 'error',
          description: err.response?.data.message,
        });
      }
    },
    [addToast, handleGoBack, deliveryman.id],
  );

  return (
    <Form onSubmit={handleSubmit} ref={formRef} initialData={deliveryman}>
      <Container>
        <Header />
        <Wrapper>
          <Content>
            <Top>
              <h1>Cadastro de entregadores</h1>
              <div>
                <button type="button" onClick={handleGoBack}>
                  Voltar
                </button>
                <button type="submit">Salvar entregador</button>
              </div>
            </Top>
            <FormContainer>
              <AvatarField />
              <Input
                name="name"
                label="Nome do entregador"
                placeholder="Insira o nome do entregador"
              />
              <Input
                name="email"
                label="E-mail do entregador"
                placeholder="Insira o e-mail do entregador"
              />
            </FormContainer>
          </Content>
        </Wrapper>
      </Container>
    </Form>
  );
};

export default EditDeliveryMan;
