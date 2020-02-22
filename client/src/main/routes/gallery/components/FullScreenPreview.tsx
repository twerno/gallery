import AnimatedLoader from 'main/components/AnimatedLoader';
import FullScreenContainer from 'main/components/FullScreenContainer';
import { SpringHorizontalTransition } from 'main/components/HorizontalTransition';
import CloseButton from 'main/components/styled/CloseButton';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';

import { galleryItemSlice } from '../redux/GalleryItemSlice';
import { IPreviewImg } from '../redux/GalleryItemState';
import { FullScreenPreviewGiphyImage } from './FullScreenPreviewGiphyImage';
import { FullScreenPreviewPixabyImage } from './FullScreenPreviewPixabyImage';


export interface IFullScreenPreview {
    className?: string;
    previewImg: IPreviewImg;
    previewNextHandler: () => void;
    previewPrevHandler: () => void;
}

const _FullScreenPreview: React.FC<IFullScreenPreview> = ({ previewImg, className, previewNextHandler, previewPrevHandler }) => {
    const dispatch = useDispatch();
    const [direction, setDirection] = React.useState<'next' | 'prev' | undefined>(undefined);

    React.useEffect(() => {
        const body = document.querySelector('body');
        body?.classList.add('noScroll');
        return () => { body?.classList.remove('noScroll'); }
    }, []);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            setDirection('next');
            previewNextHandler();
        },
        onSwipedRight: () => {
            setDirection('prev');
            previewPrevHandler();
        }
    });

    return (
        <div className={className} {...handlers}>
            <ButtonRow>
                <CloseButton onClick={() => dispatch(galleryItemSlice.actions.setPreview(undefined))} />
            </ButtonRow>

            <SpringHorizontalTransition item={previewImg} transitionDirection={direction}>
                {item => <FullScreenPreviewImage previewImg={item} />}
            </SpringHorizontalTransition>
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

const ButtonRow = styled.div`
    position:absolute;
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: flex-end;
    z-index: 2;
`;

interface IFullScreenPreviewImageProps {
    previewImg?: IPreviewImg;
}

const FullScreenPreviewImage = (props: IFullScreenPreviewImageProps) => {

    return <>
        {props.previewImg?.imgProvider === 'giphy'
            && <FullScreenPreviewGiphyImage image={props.previewImg} />
        }
        {
            props.previewImg?.imgProvider === 'pixabay'
            && <FullScreenPreviewPixabyImage image={props.previewImg} />
        }
    </>
}
