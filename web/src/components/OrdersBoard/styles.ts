import styled from 'styled-components';

export const Board = styled.div`
  padding: 1rem;
  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  > header {
    padding: 0.5rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.5rem;

  button {
    background: #fff;
    border: 1px solid rgba(204, 204, 204, 0.4);
    border-radius: 0.5rem;
    height: 128px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;

    strong {
      font-weight: 500;
    }

    span {
      font-size: 1rem;
      color: #666;
    }

    & + button {
      margin-top: 1.5rem;
    }
  }
`;
