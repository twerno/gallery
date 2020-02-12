import styled, { css } from 'styled-components';

interface IGalleryItemImgContainerProps {
    readonly isHidden: boolean;
}

export default styled.picture<IGalleryItemImgContainerProps>`
    opacity: 1;
    position: relative;
    min-width: 100%;
    transition: opacity 0.2s ease-in-out;

    ${
    props => props.isHidden && css`
        position: absolute;
        opacity: 0;
    `}
`;
