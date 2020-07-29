import styled from 'styled-components';

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
    transition: all 0.2s ease-out;
    background-color: #cccccc;

    &:last-child {
      background-color: #e02041;
      margin-left: 20px;
    }

    &:hover {
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
      transform: translateY(-5px);
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
  margin: 70px 0;
  padding: 30px;
  border: 2px solid #e3e4e8;
  border-radius: 8px;

  div {
    & + div {
      margin: 0px;
    }
  }
`;

export const FirstInputContent = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;

  > div:first-child {
    width: 60%;
  }
`;

export const SecondInputContent = styled.div`
  display: flex;
  width: 40%;
  padding-left: 30px;

  > div {
    width: 50%;

    & + div {
      padding-left: 30px;
    }
  }
`;

export const ThirdInputContent = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;

  > div {
    width: 33%;

    & + div {
      padding-left: 30px;
    }
  }
`;
