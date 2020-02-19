import AnimatedLoader from 'components/AnimatedLoader';
import FullScreenContainer from 'components/FullScreenContainer';
import CloseButton from 'components/styled/CloseButton';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import styled, { css, keyframes } from 'styled-components';

import { galleryItemSlice } from '../redux/GalleryItemSlice';
import { IPreviewGiphyImg, IPreviewPixabyImg } from '../redux/GalleryItemState';
import { FullScreenPreviewGiphyImage } from './FullScreenPreviewGiphyImage';
import { FullScreenPreviewPixabyImage } from './FullScreenPreviewPixabyImage';


export interface IFullScreenPreview {
    className?: string;
    previewImg?: IPreviewGiphyImg | IPreviewPixabyImg;
    previewNextHandler: () => void;
    previewPrevHandler: () => void;
}

const _FullScreenPreview: React.FC<IFullScreenPreview> = ({ previewImg, className, previewNextHandler, previewPrevHandler }) => {
    const [direction, setDirection] = React.useState<'left' | 'right' | undefined>(undefined);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const body = document.querySelector('body');
        body?.classList.add('noScroll');
        return () => { body?.classList.remove('noScroll'); }
    }, []);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            previewNextHandler();
            setDirection('left');
        },
        onSwipedRight: () => {
            previewPrevHandler();
            setDirection('right');
        }
    });

    return (
        <div className={className} {...handlers}>
            <ButtonRow>
                <CloseButton onClick={() => dispatch(galleryItemSlice.actions.setPreview(undefined))} />
            </ButtonRow>
            <Transition key={previewImg?.id || ''} direction={direction}>
                {previewImg?.imgProvider === 'giphy'
                    && <FullScreenPreviewGiphyImage image={previewImg} />
                }
                {previewImg?.imgProvider === 'pixabay'
                    && <FullScreenPreviewPixabyImage image={previewImg} />
                }
            </Transition>
        </div>
    );
}

export const FullScreenPreview = styled(_FullScreenPreview)`
    background-color: rgba(0, 0, 0, .95);
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100%;
    z-index: 100;
`;

export const FullScreenPreviewLoadingPlaceholder = () => (
    <FullScreenContainer position="relative">
        <AnimatedLoader mode="light" />
    </FullScreenContainer>
);

export const ButtonRow = styled.div`
    position:absolute;
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: flex-end;
    z-index: 2;
`;

const slideRight = keyframes`
    from {
        transform: translateX(-200%)
    }

    to {
        transform: translateX(0)
    }
`;

const slideLeft = keyframes`
    from {
        transform: translateX(200%)
    }

    to {
        transform: translateX()
    }
`;

export const Transition = styled.div<{ direction?: 'left' | 'right' }>`
    ${
    props => props.direction === 'left'
        ? css`animation: ${slideLeft} 0.5s linear 1;`
        : props.direction === 'right'
            ? css`animation: ${slideRight} 0.5s linear 1;`
            : ''
    }
    position: relative;
    height: 100%;
    width: 100%;
`;
