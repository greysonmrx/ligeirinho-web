import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import Header from '../../components/Header';
import Input from '../../components/Input';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import {
  Container,
  Wrapper,
  Content,
  Top,
  FormContainer,
  FirstInputContent,
  SecondInputContent,
  ThirdInputContent,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { Recipient } from '../../interfaces/recipients';

interface UpdateRecipientFormData {
  name: string;
  street: string;
  number: number;
  complement: string;
  state: string;
  city: string;
  zip_code: string;
}

interface IState {
  recipient: Recipient;
}

const EditRecipient: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToast();

  const { recipient } = location.state as IState;

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleSubmit = useCallback(
    async ({
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    }: UpdateRecipientFormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório.'),
          street: Yup.string().required('A rua é obrigatória.'),
          number: Yup.string().required('O número é obrigatório.'),
          complement: Yup.string().required('O complemento é obrigatório.'),
          state: Yup.string().required('O estado é obrigatório.'),
          city: Yup.string().required('A cidade é obrigatória.'),
          zip_code: Yup.string()
            .matches(/^(\d{5})-(\d{3})$/, {
              message: 'Formato incorreto',
              excludeEmptyString: true,
            })
            .required('O CEP é obrigatório.'),
        });

        await schema.validate(
          { name, street, number, complement, state, city, zip_code },
          { abortEarly: false },
        );

        await api.put(`/recipients/${recipient.id}`, {
          name,
          street,
          number,
          complement,
          state,
          city,
          zip_code,
        });

        formRef.current?.setErrors({});

        addToast({
          title: 'Tudo certo!',
          description: 'Destinatário atualizado com sucesso.',
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
    [addToast, handleGoBack, recipient.id],
  );

  return (
    <Form onSubmit={handleSubmit} ref={formRef} initialData={recipient}>
      <Container>
        <Header />
        <Wrapper>
          <Content>
            <Top>
              <h1>Edição de destinatários</h1>
              <div>
                <button type="button" onClick={handleGoBack}>
                  Voltar
                </button>
                <button type="submit">Salvar destinatário</button>
              </div>
            </Top>
            <FormContainer>
              <Input
                name="name"
                label="Nome"
                placeholder="Insira o nome do destinatário"
              />
              <FirstInputContent>
                <Input
                  name="street"
                  label="Rua"
                  placeholder="Insira a rua do destinatário"
                />
                <SecondInputContent>
                  <Input
                    name="number"
                    type="number"
                    label="Número"
                    placeholder="Insira o número"
                  />
                  <Input
                    name="complement"
                    label="Complemento"
                    placeholder="Insira o complemento"
                  />
                </SecondInputContent>
              </FirstInputContent>
              <ThirdInputContent>
                <Input
                  name="city"
                  label="Cidade"
                  placeholder="Insira a cidade do destinatário"
                />
                <Input
                  name="state"
                  label="Estado"
                  placeholder="Insira o estado do destinatário"
                />
                <Input
                  name="zip_code"
                  label="CEP do destinatário"
                  placeholder="Insira o CEP do destinatário"
                />
              </ThirdInputContent>
            </FormContainer>
          </Content>
        </Wrapper>
      </Container>
    </Form>
  );
};

export default EditRecipient;
