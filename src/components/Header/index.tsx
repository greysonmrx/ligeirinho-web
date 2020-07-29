import React from 'react';
import { MdPowerSettingsNew } from 'react-icons/md';
import { useHistory, Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/images/logo_simple.svg';

import { Container, Wrapper, Item } from './styles';

const Header: React.FC = () => {
  const history = useHistory();
  const { signOut } = useAuth();

  const pathName = history.location.pathname.split('/')[1];

  return (
    <Container>
      <Wrapper>
        <img src={logoImg} alt="Ligeirinho" />
        <ul>
          <li>
            <Link to="/deliveries">
              <Item isActive={pathName === 'deliveries'}>Encomendas</Item>
            </Link>
          </li>
          <li>
            <Link to="/deliverymen">
              <Item isActive={pathName === 'deliverymen'}>Entregadores</Item>
            </Link>
          </li>
          <li>
            <Link to="/recipients">
              <Item isActive={pathName === 'recipients'}>Destinatários</Item>
            </Link>
          </li>
          <li>
            <Link to="/problems">
              <Item isActive={pathName === 'problems'}>Problemas</Item>
            </Link>
          </li>
        </ul>
        <button type="button" onClick={signOut}>
          <img
            src="https://uifaces.co/our-content/donated/vIqzOHXj.jpg"
            alt="Avatar"
          />
          <MdPowerSettingsNew />
        </button>
      </Wrapper>
    </Container>
  );
};

export default Header;
