import styled from 'styled-components';

interface DotProps {
  fill: boolean;
}

export const Container = styled.div`
  align-self: stretch;
  margin-top: 40px;
  padding: 0 40px;
`;

export const Line = styled.div`
  height: 4px;
  background: #e3e4e8;
  border: 1px solid #e3e4e8;
  margin-top: 15px;
  margin: 0 30px;
`;

export const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -22px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      color: #071633;
      font-weight: 500;
      font-size: 12px;
      width: 80px;
      text-align: center;
      margin-top: 5px;
    }
  }
`;

export const Dot = styled.div<DotProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${({ fill }) => (fill ? '#e02041' : '#e3e4e8')};

  svg {
    color: #ffffff;
    font-size: 20px;
  }
`;
