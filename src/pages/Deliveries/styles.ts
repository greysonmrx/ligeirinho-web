import styled, { css } from 'styled-components';
import { rgba } from 'polished';

interface DeliveryStatusProps {
  color: string;
}

interface FilterProps {
  isActive: boolean;
}

export const Container = styled.div`
  background-color: #fafafc;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 70px 25px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1366px;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  h1 {
    color: #071633;
    font-size: 35px;
    font-weight: 600;
  }

  button {
    padding: 15px 20px;
    border-radius: 5px;
    border: none;
    color: #ffffff;
    font-weight: 500;
    background-color: #e02041;
    transition: all 0.2s ease-out;

    &:hover {
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
      transform: translateY(-5px);
    }
  }
`;

export const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 70px 0;
`;

export const ChartCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  width: 315px;
  height: 110px;
  border-radius: 8px;
  background-color: #ffffff;
  border: 2px solid #e3e4e8;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 30px;
    height: 100%;

    p {
      font-size: 16px;
      color: #acb3be;
    }

    strong {
      font-weight: 600;
      font-size: 25px;
      color: #071633;
    }
  }
`;

export const Filter = styled.button<FilterProps>`
  border: none;
  color: #acb3be;
  border-bottom: 3px solid transparent;

  ${({ isActive }) =>
    isActive &&
    css`
      color: #e02041;
      border-bottom: 3px solid #e02041;
    `};
`;

export const DeliverymanField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

export const DeliveryStatusTD = styled.td`
  width: 100px;
`;

export const DeliveryStatus = styled.span<DeliveryStatusProps>`
  ${({ color }: DeliveryStatusProps) => css`
    background: ${rgba(color, 0.075)};
    color: ${color};
  `}
  text-transform: uppercase;
  padding: 9px 21px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 600;
  min-width: 250px;
`;
