import { breakpoints } from 'main/globalStyles';
import styled, { css } from 'styled-components';

export const GalleryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    overflow-x: hidden;
    position: relative;
    left: 0px;
    right: 0px;
    margin: 0px 10px;

    &::after {
        content: '';
        flex-grow: 999999999;
        height: 0;
    }
`;

export const GalleryItemPlaceholderWraper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 500px;
  width: 100%;
  height: 100%;

  @media only screen and (max-width: ${breakpoints.md}) {

    & {
      min-width: 200px;
    }
  }
`;


export interface IGalleryItemProps {
  disabled?: boolean;
}

export const GalleryItem = styled.div<IGalleryItemProps>`
  margin: 1px;
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  height: 200px;

  @media only screen and (max-width: ${breakpoints.md}) {

      & {
          height: 100px;
      }
  }

  pointer-events: ${props => props.disabled ? 'none' : 'initial'};
`;

/**
* 
*/
interface IGalleryPicture {
  readonly isHidden: boolean;
}

/**
* 
*/
export const GalleryPicture = styled.picture<IGalleryPicture>`
  opacity: 1;
  position: relative;
  transition: opacity 0.2s ease-in-out;
  min-width: 100%;

  ${
  props => props.isHidden && css`
          position: absolute;
          opacity: 0;
  `}
`;

export const GalleryImg = styled.img`
  object-fit: cover;
  min-width: 100%;
  height: 100%;
`;