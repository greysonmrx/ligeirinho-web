import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Select from '../../components/Select';
import Input from '../../components/Input';

import api from '../../services/api';

import {
  Deliveryman,
  ResponseListDeliverymen,
} from '../../interfaces/deliveryman';
import { Recipient, ResponseListRecipients } from '../../interfaces/recipients';

import { useToast } from '../../hooks/toast';

import {
  Container,
  Wrapper,
  Content,
  Top,
  FormContainer,
  SelectContainer,
} from './styles';

const CreateDelivery: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();

  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [deliverymen, setDeliverymen] = useState<Deliveryman[]>([]);
  const [selectedRecipient, setSelectedRecipient] = useState<string>('');
  const [selectedDeliveryman, setSelectedDeliveryman] = useState<string>('');

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    async function loadData() {
      try {
        const [recipientResponse, deliverymanResponse] = await Promise.all([
          api.get<ResponseListRecipients>('/recipients', {
            params: { limit: 300 },
          }),
          api.get<ResponseListDeliverymen>('/deliverymen', {
            params: { limit: 300 },
          }),
        ]);

        setRecipients(recipientResponse.data.recipients);
        setDeliverymen(deliverymanResponse.data.deliverymen);
      } catch (err) {
        addToast({
          title: 'Ocorreu um erro!',
          description: 'Não foi possível buscar os dados do formulário!',
          type: 'error',
        });
      }
    }

    loadData();
  }, [addToast]);

  const handleSubmit = useCallback(
    async (data): Promise<void> => {
      if (!selectedRecipient || !selectedDeliveryman || !data.product) {
        addToast({
          title: 'Ocorreu um erro!',
          type: 'error',
          description: 'Preencha todo o formulário.',
        });

        return;
      }

      try {
        await api.post('/deliveries', {
          ...data,
          recipient_id: selectedRecipient,
          deliveryman_id: selectedDeliveryman,
        });
        addToast({
          title: 'Tudo certo!',
          description: 'Encomenda cadastrada com sucesso.',
        });

        handleGoBack();
      } catch (err) {
        addToast({
          title: 'Ação não concluída!',
          type: 'error',
          description: err.response?.data.message,
        });
      }
    },
    [selectedRecipient, selectedDeliveryman, addToast, handleGoBack],
  );

  const handleChangeRecipient = useCallback(selectedOption => {
    const { value } = selectedOption;

    setSelectedRecipient(value);
  }, []);

  const handleChangeDeliveryman = useCallback(selectedOption => {
    const { value } = selectedOption;

    setSelectedDeliveryman(value);
  }, []);

  const deliverymenOptions = useMemo(() => {
    return deliverymen.map((deliveryman: Deliveryman) => ({
      value: deliveryman.id,
      label: deliveryman.name,
    }));
  }, [deliverymen]);

  const recipientsOptions = useMemo(() => {
    return recipients.map((recipient: Recipient) => ({
      value: recipient.id,
      label: recipient.name,
    }));
  }, [recipients]);

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Header />
        <Wrapper>
          <Content>
            <Top>
              <h1>Cadastro de encomendas</h1>
              <div>
                <button type="button" onClick={handleGoBack}>
                  Voltar
                </button>
                <button type="submit">Salvar encomenda</button>
              </div>
            </Top>
            <FormContainer>
              <SelectContainer>
                <Select
                  name="deliveryman"
                  label="Destinatário"
                  onChange={handleChangeRecipient}
                  options={recipientsOptions}
                  placeholder="Selecione o destinatário"
                />
                <Select
                  name="recipient"
                  label="Entregador"
                  onChange={handleChangeDeliveryman}
                  options={deliverymenOptions}
                  placeholder="Selecione o entregador"
                />
              </SelectContainer>
              <Input
                name="product"
                label="Nome do produto"
                placeholder="Insira o nome do produto"
              />
            </FormContainer>
          </Content>
        </Wrapper>
      </Container>
    </Form>
  );
};

export default CreateDelivery;
