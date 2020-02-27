// import styled, { css } from 'styled-components';

// import { IGalleryItemProps } from '../gallery/GalleryItem';


// interface IGalleryItemWithPlayIndicatorProps extends IGalleryItemProps {
//     indicator: 'play' | 'pause' | 'none';
// }

// export const GalleryItemWithPlayIndicator = styled(GalleryItem) <IGalleryItemWithPlayIndicatorProps>`

//     ${props => props.indicator === 'play'
//         ? playIndicator
//         : props.indicator === 'pause'
//             ? pauseIndicator
//             : ''
//     }
// `;

// const playIndicator = css<IGalleryItemProps>`
//     position: relative;

//     &::before,
//     &::after {
//         content: '';
//         position: absolute;
//         left: 50%;
//         top: 50%;
//         transform: translate(-50%, -50%);
//         z-index: 2;
//     }

//     &::before {
//         width: 5rem;
//         height: 5rem;

//         background-color: rgba(0, 0, 0, .6);
//         border-radius: 50%;
//     }

//     &::after {
//         border-color: transparent;
//         border-left-color: rgba(255, 255, 255, ${props => props.disabled ? '.1' : '.9'});
//         border-style: solid;
//         border-width: 1rem 0 1rem 2rem;
//         margin-left: 0.2rem;
//     }

//     &:hover::before {
//         background-color: rgba(255, 255, 255, .6);
//     }

//     &:hover::after {
//         border-left-color: rgba(0, 0, 0, .9);
//     }
// `;

// const pauseIndicator = css`
//     position: relative;

//     &::before,
//     &::after {
//         content: '';
//         position: absolute;
//         left: 50%;
//         top: 50%;
//         transform: translate(-50%, -50%);
//         z-index: 2;
//     }

//     &::before {
//         width: 5rem;
//         height: 5rem;

//         background-color: rgba(0, 0, 0, .6);
//         border-radius: 50%;
//     }

//     &::after {
//         border-color: transparent;
//         border-left-color: rgba(255, 255, 255, .9);
//         border-right-color: rgba(255, 255, 255, .9);
//         border-style: solid;
//         border-width: 0 0.4rem 0 0.4rem;
//         width: 0.7rem;
//         height: 2rem;
//     }

//     &:hover::before {
//         background-color: rgba(255, 255, 255, .6);
//     }

//     &:hover::after {
//         border-left-color: rgba(0, 0, 0, .9);
//     }
// `;

// export const PlayButton = styled.div`${playIndicator}`;
// export const PauseButton = styled.div`${pauseIndicator}`;