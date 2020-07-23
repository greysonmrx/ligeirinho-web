import styled from 'styled-components';

import signInBackgroundImg from '../../assets/images/sign-in-background.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 30px;
  overflow-x: auto;

  width: 100%;
  max-width: 700px;

  > span {
    text-align: center;
    font-size: 13px;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;

export const Wrapper = styled.div`
  max-width: 500px;
  width: 80%;
  padding-top: 80px;

  img {
    height: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 50px 0;
    width: 100%;

    button {
      height: 56px;
      margin-top: 40px;
      border: none;
      border-radius: 5px;
      color: #ffffff;
      font-weight: 500;
      background-color: #e02041;
    }

    > p {
      margin-top: 20px;
      text-align: center;
      font-weight: 600;

      a {
        color: #e02041;
        word-break: unset;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export const Top = styled.div`
  margin-top: 60px;

  h1 {
    font-size: 36px;
    font-weight: 800;
    color: #3c404a;
    margin-bottom: 10px;
  }

  p {
    font-size: 17px;
  }
`;
