import { IGiphyImage } from "@shared/";
import { IResponsivePictureProps } from "../GalleryResponsivePicture";

export default {
    convertToResponsivePictureProps
};

function convertToResponsivePictureProps(image: IGiphyImage): IResponsivePictureProps {
    const fixed_still = image.images.fixed_height_still;
    const small_still = image.images.fixed_height_small_still;

    return {
        alt: image.title,
        defaultImgSrc: small_still?.url,
        responsiveSrcList: [
            { src: fixed_still?.url, media: '(min-width: 600px)' },
        ]
    };
}
