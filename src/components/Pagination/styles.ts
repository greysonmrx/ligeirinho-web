import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0px;

  p {
    strong {
      font-weight: 600;
    }
  }

  div {
    display: flex;
    align-items: center;
    flex-direction: row;

    span {
      margin: 0 10px;
    }

    p {
      margin-right: 20px;
    }

    button {
      display: flex;
      border: none;
      background-color: #e02041;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      align-items: center;
      justify-content: center;

      svg {
        font-size: 18px;
        color: #ffffff;
      }

      &:disabled {
        background-color: #acb3be;
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
`;
