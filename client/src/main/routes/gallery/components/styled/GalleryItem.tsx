import { breakpoints } from 'main/globalStyles';
import styled, { css } from 'styled-components';

export interface IGalleryItemProps {
    disable?: boolean;
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

    pointer-events: ${props => props.disable ? 'none' : 'initial'};

    picture {
        min-width: 100%;
    }

    img {
        object-fit: cover;
        min-width: 100%;
        height: 100%;
    }
`;

/**
 * 
 */
export const FullScreenGalleryItem = styled.div<IGalleryItemProps>`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    padding: 2rem;

    picture {
        height: 100%;
    }

    img {
        height: 100%;
        max-width: 100%;
        object-fit: contain;
    }
`;

/**
 * 
 */
interface IHideablePictureProps {
    readonly isHidden: boolean;
}

/**
 * 
 */
export const HideablePicture = styled.picture<IHideablePictureProps>`
    opacity: 1;
    position: relative;
    transition: opacity 0.2s ease-in-out;

    ${
    props => props.isHidden && css`
            position: absolute;
            opacity: 0;
    `}
`;
