import styled from 'styled-components';

interface IFullScreenContainerProps {
  position: 'relative' | 'absolute';
}

export default styled.div<IFullScreenContainerProps>`
  position: ${props => props.position};
  width: 100%;
  top: 0px;
  bottom: 0px;
`;
