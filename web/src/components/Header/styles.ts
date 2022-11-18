import styled from 'styled-components';

export const Container = styled.header`
  background: #d73035;
  display: flex;
  justify-content: center;
  height: 198px;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details {
    h1 {
      color: #fff;
      font-size: 2.5rem;
    }
    h2 {
      color: #fff;
      font-size: 1rem;
      font-weight: 400;
      opacity: 0.9;
      margin-top: 0.2rem;
    }
  }
`;
