import React from 'react';

import { Container } from './styles';

interface TableProps {
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ children }: TableProps) => {
  return <Container>{children}</Container>;
};

export default Table;
