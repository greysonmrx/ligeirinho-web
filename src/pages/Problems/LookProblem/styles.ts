import styled from 'styled-components';
import { rgba } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: unset;

  > div {
    width: 500px;
    padding: 30px;
    border-radius: 5px;
    background-color: #ffffff;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      strong {
        font-weight: 700;
        font-size: 18px;
        color: #071633;
      }

      button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: none;
        border: none;
      }
    }
  }
`;

export const Content = styled.div`
  padding: 25px 0;
  display: flex;
  align-items: center;

  div {
    &:last-child {
      margin-left: 15px;

      p {
        font-weight: 600;
        font-size: 17px;
        color: #071633;
        margin-bottom: 5px;
      }

      span {
        font-weight: 600;

        i {
          font-weight: 400;
        }
      }
    }
  }
`;

export const IconContainer = styled.div`
  background-color: ${rgba('#e02041', 0.1)};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 5px;

  svg {
    font-size: 28px;
    color: #e02041;
  }
`;

export const Details = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #e3e4e8;

  > p {
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 17px;
    color: #071633;
  }

  > div {
    display: flex;
    margin-top: 15px;

    svg {
      color: #e02041;
      font-size: 23px;
      margin-right: 15px;
    }

    div {
      p {
        margin-bottom: 5px;
        font-weight: 600;
        font-size: 16px;
        color: #071633;
      }

      span {
        font-size: 15px;
      }
    }
  }
`;

export const TimeLineContainer = styled.div`
  width: 100%;
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px solid #e3e4e8;
  padding-bottom: 25px;

  > p {
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 17px;
    color: #071633;
  }
`;
