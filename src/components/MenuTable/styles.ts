import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 60px;
  background: none;
  border-bottom: 1px solid #e3e4e8;
  margin-bottom: 30px;

  div {
    display: flex;
    align-items: center;

    input {
      width: 250px;
      border: none;
      background: none;
      padding: 15px 15px;
      border-radius: 6px;

      &::placeholder {
        color: #bcbcbc;
      }
    }

    svg {
      color: #acb3be;
      font-size: 25px;
    }
  }

  ul {
    display: flex;
    height: 100%;

    li {
      & + li {
        margin-left: 20px;
      }

      button {
        height: 100%;
        background: none;
        align-items: center;
        padding: 0 20px;
        font-size: 17px;
        font-weight: 600;

        &:hover {
          color: #e02041;
          border-bottom: 3px solid #e02041;
        }
      }
    }
  }
`;
