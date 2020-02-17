import { IGiphyImage, IPixabayImage } from '@shared/';
import AnimatedLoader from 'components/AnimatedLoader';
import FullScreenContainer from 'components/FullScreenContainer';
import CloseButton from 'components/styled/CloseButton';
import * as React from 'react';
import styled from 'styled-components';

import { FullScreenPreviewGiphyImage } from './FullScreenPreviewGiphyImage';
import { FullScreenPreviewPixabyImage } from './FullScreenPreviewPixabyImage';

export interface IPreviewGiphyImg {
    imgProvider: 'giphy';
    img: IGiphyImage;
}

export interface IPreviewPixabyImg {
    imgProvider: 'pixabay';
    img: IPixabayImage;
}

export type IPreviewImage = IPreviewGiphyImg | IPreviewPixabyImg | undefined;

export interface IFullScreenPreview {
    className?: string;
    preview: IPreviewImage;
    setPreview: React.Dispatch<React.SetStateAction<IPreviewImage>>;
}

const _FullScreenPreview: React.FC<IFullScreenPreview> = ({ preview, setPreview, className }) => {

    React.useEffect(() => {
        const body = document.querySelector('body');
        body?.classList.add('noScroll');
        return () => { body?.classList.remove('noScroll'); }
    }, []);

    return (
        <div className={className}>
            <ButtonRow>
                <CloseButton onClick={() => setPreview(undefined)} />
            </ButtonRow>
            {preview?.imgProvider === 'giphy'
                && <FullScreenPreviewGiphyImage image={preview.img} />
            }
            {preview?.imgProvider === 'pixabay'
                && <FullScreenPreviewPixabyImage image={preview.img} />
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
