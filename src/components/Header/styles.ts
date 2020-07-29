import styled, { css } from 'styled-components';

interface ItemListProps {
  isActive: boolean;
}

const linkStyle = {
  active: css`
    color: #e02041;
    border-color: #e02041;
  `,
  disabled: css`
    color: #acb3be;
    border-color: transparent;
  `,
};

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #ffffff;
  height: 100px;
  padding: 0 30px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  max-width: 1366px;

  > img {
    height: 40px;
  }

  ul {
    display: flex;
    height: 100%;

    li {
      & + li {
        margin-left: 25px;
      }
    }
  }

  button {
    display: flex;
    align-items: center;
    background: none;
    border: none;

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      border: 2px solid #e02041;
    }

    svg {
      margin-left: 10px;
      font-size: 20px;
      color: #e02041;
    }
  }
`;

export const Item = styled.span<ItemListProps>`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  font-size: 17px;
  font-weight: 600;
  border-bottom: 3px solid transparent;

  ${({ isActive }) => (isActive ? linkStyle.active : linkStyle.disabled)};

  &:hover {
    ${linkStyle.active};
  }
`;
