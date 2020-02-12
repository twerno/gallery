import styled from 'styled-components';

export default styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  position: relative;
  
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  
  &::before {
    border: .25rem solid rgba(1, 1, 1, 0.3);
    animation: 4s infinite spin linear;
  }

  /* &::after {
    border: .25rem solid rgb(75, 75, 75);
    animation: 5s infinite spin linear;
  } */

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 2rem;
    height: 2rem;
    border-right-color: transparent;
    border-left-color: transparent;
    border-radius: 50%;
  }

  @keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
  }
`;