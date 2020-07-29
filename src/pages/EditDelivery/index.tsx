import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import { useHistory, useLocation } from 'react-router-dom';

import Header from '../../components/Header';
import Select from '../../components/Select';
import Input from '../../components/Input';

import api from '../../services/api';

import {
  Deliveryman,
  ResponseListDeliverymen,
} from '../../interfaces/deliveryman';
import { Recipient, ResponseListRecipients } from '../../interfaces/recipients';
import { Delivery } from '../../interfaces/delivery';

import { useToast } from '../../hooks/toast';

import {
  Container,
  Wrapper,
  Content,
  Top,
  FormContainer,
  SelectContainer,
} from './styles';

interface IState {
  id: string;
}

const EditDelivery: React.FC = () => {
  const history = useHistory();
  const { state } = useLocation();
  const { addToast } = useToast();

  const { id } = state as IState;

  const [delivery, setDelivery] = useState<Delivery | null>(null);
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

        const { data } = await api.get<Delivery>(`/deliveries/${id}`);

        setDelivery(data);
        setSelectedRecipient(data.recipient_id);
        setSelectedDeliveryman(data.deliveryman_id);
      } catch (err) {
        addToast({
          title: 'Ocorreu um erro!',
          description: 'Não foi possível buscar os dados do formulário!',
          type: 'error',
        });
      }
    }

    loadData();
  }, [addToast, id]);

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
        await api.put(`/deliveries/${id}`, {
          ...data,
          recipient_id: selectedRecipient,
          deliveryman_id: selectedDeliveryman,
        });

        addToast({
          title: 'Tudo certo!',
          description: 'Encomenda salva com sucesso.',
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
    [selectedRecipient, selectedDeliveryman, addToast, handleGoBack, id],
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
    <Form onSubmit={handleSubmit} initialData={{ product: delivery?.product }}>
      <Container>
        <Header />
        <Wrapper>
          <Content>
            <Top>
              <h1>Edição de encomendas</h1>
              <div>
                <button type="button" onClick={handleGoBack}>
                  Voltar
                </button>
                <button type="submit">Salvar encomenda</button>
              </div>
            </Top>
            {delivery && (
              <FormContainer>
                <SelectContainer>
                  <Select
                    name="recipient"
                    label="Destinatário"
                    onChange={handleChangeRecipient}
                    options={recipientsOptions}
                    defaultValue={{
                      value: delivery.recipient_id,
                      label: delivery.recipient.name,
                    }}
                    placeholder="Selecione o destinatário"
                  />
                  <Select
                    name="deliveryman"
                    label="Entregador"
                    onChange={handleChangeDeliveryman}
                    options={deliverymenOptions}
                    defaultValue={{
                      value: delivery.deliveryman_id,
                      label: delivery.deliveryman.name,
                    }}
                    placeholder="Selecione o entregador"
                  />
                </SelectContainer>
                <Input
                  name="product"
                  label="Nome do produto"
                  placeholder="Insira o nome do produto"
                />
              </FormContainer>
            )}
          </Content>
        </Wrapper>
      </Container>
    </Form>
  );
};

export default EditDelivery;
