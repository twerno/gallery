import styled from 'styled-components';

export default styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 500px;
  width: 100%;
  height: 100%;

  @media only screen and (max-width: 500px) {

    & {
      min-width: 200px;
    }
  }
`;


