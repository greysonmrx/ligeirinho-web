import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdErrorOutline } from 'react-icons/md';

import { Problem } from '../../../interfaces/problem';

import { Container, Content, IconContainer, Details } from './styles';

interface LookProblemProps {
  problem: Problem;
  closeCallback(): void;
}

const LookProblem: React.FC<LookProblemProps> = ({
  problem,
  closeCallback,
}: LookProblemProps) => {
  return (
    <Container>
      <div>
        <header>
          <strong>Informações do problema</strong>
          <button type="button" onClick={closeCallback}>
            <IoMdClose />
          </button>
        </header>
        <Content>
          <IconContainer>
            <MdErrorOutline />
          </IconContainer>
          <div>
            <p>{problem.delivery.product}</p>
            <span>
              ID: <i>{problem.id}</i>
            </span>
          </div>
        </Content>
        <Details>
          <p>Descrição</p>
          <div>
            <p>{problem.description}</p>
          </div>
        </Details>
      </div>
    </Container>
  );
};

export default LookProblem;
