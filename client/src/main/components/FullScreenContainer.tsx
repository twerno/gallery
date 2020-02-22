import styled from 'styled-components';

interface IFullScreenContainerProps {
  position: 'relative' | 'absolute' | 'fixed';
}

export default styled.div<IFullScreenContainerProps>`
  position: ${props => props.position};
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
`;
