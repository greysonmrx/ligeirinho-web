import React from 'react';

import { Container } from './styles';

interface MenuTableProps {
  children: React.ReactNode;
}

const MenuTable: React.FC<MenuTableProps> = ({ children }: MenuTableProps) => {
  return <Container>{children}</Container>;
};

export default MenuTable;
