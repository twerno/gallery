import AnimatedLoader from 'components/AnimatedLoader';
import FullScreenContainer from 'components/FullScreenContainer';
import CloseButton from 'components/styled/CloseButton';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { IGallerySetPreviewAction } from '../redux/GalleryActions';
import { IPreviewGiphyImg, IPreviewPixabyImg } from '../redux/GalleryState';
import { FullScreenPreviewGiphyImage } from './FullScreenPreviewGiphyImage';
import { FullScreenPreviewPixabyImage } from './FullScreenPreviewPixabyImage';

export interface IFullScreenPreview {
    className?: string;
    previewImg?: IPreviewGiphyImg | IPreviewPixabyImg;
}

const _FullScreenPreview: React.FC<IFullScreenPreview> = ({ previewImg, className }) => {

    const dispatch = useDispatch<React.Dispatch<IGallerySetPreviewAction>>();

    React.useEffect(() => {
        const body = document.querySelector('body');
        body?.classList.add('noScroll');
        return () => { body?.classList.remove('noScroll'); }
    }, []);

    return (
        <div className={className}>
            <ButtonRow>
                <CloseButton onClick={() => dispatch({ type: 'GallerySetPreview', data: {} })} />
            </ButtonRow>
            {previewImg?.imgProvider === 'giphy'
                && <FullScreenPreviewGiphyImage image={previewImg} />
            }
            {previewImg?.imgProvider === 'pixabay'
                && <FullScreenPreviewPixabyImage image={previewImg} />
            }
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
