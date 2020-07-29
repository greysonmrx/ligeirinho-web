import React from 'react';
import { IoMdClose } from 'react-icons/io';
import {
  MdAssignment,
  MdLocationOn,
  MdLocationCity,
  MdFace,
  MdDirectionsCar,
} from 'react-icons/md';

import TimeLine from '../../../components/TimeLine';

import { ParsedDelivery } from '../../../interfaces/delivery';

import {
  Container,
  Content,
  IconContainer,
  Details,
  TimeLineContainer,
} from './styles';

interface LookDeliveryProps {
  delivery: ParsedDelivery;
  closeCallback(): void;
}

const LookDelivery: React.FC<LookDeliveryProps> = ({
  delivery,
  closeCallback,
}: LookDeliveryProps) => {
  return (
    <Container>
      <div>
        <header>
          <strong>Informações da encomenda</strong>
          <button type="button" onClick={closeCallback}>
            <IoMdClose />
          </button>
        </header>
        <Content>
          <IconContainer>
            <MdAssignment />
          </IconContainer>
          <div>
            <p>{delivery.product}</p>
            <span>
              ID: <i>{delivery.id}</i>
            </span>
          </div>
        </Content>
        <Details>
          <p>Detalhes</p>
          <div>
            <MdFace />
            <div>
              <p>Destinatário</p>
              <span>{delivery.recipient.name}</span>
            </div>
          </div>
          <div>
            <MdLocationOn />
            <div>
              <p>Local</p>
              <span>
                {delivery.recipient.street}, Nº {delivery.recipient.number} /{' '}
                {delivery.recipient.city} - {delivery.recipient.state}
              </span>
            </div>
          </div>
          <div>
            <MdDirectionsCar />
            <div>
              <p>Entregador</p>
              <span>{delivery.deliveryman.name}</span>
            </div>
          </div>
          <div>
            <MdLocationCity />
            <div>
              <p>CEP</p>
              <span>{delivery.recipient.zip_code}</span>
            </div>
          </div>
        </Details>
        <TimeLineContainer>
          <p>Rastreamento</p>
          <TimeLine delivery={delivery} />
        </TimeLineContainer>
      </div>
    </Container>
  );
};

export default LookDelivery;
