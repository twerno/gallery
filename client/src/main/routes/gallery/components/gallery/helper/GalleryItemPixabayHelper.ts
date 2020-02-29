import { IResponsivePictureProps } from "../GalleryResponsivePicture";
import { IPixabayImage } from "@shared/";

export default {
    convertToResponsivePictureProps
};

function convertToResponsivePictureProps(image: IPixabayImage): IResponsivePictureProps {
    const img_small = image.previewURL;
    const img_640 = image.webformatURL;
    const img_180 = img_640.replace(/_\d{3}\./, '_180\.');

    const alt = image?.tags?.split(',')
        .map<string>(s => s.trim())
        .reduce((prev, tag) => `${prev} ${tag}`, '')
        .trim();

    return {
        alt,
        defaultImgSrc: img_small,
        responsiveSrcList: [
            { src: img_180, media: '(min-width: 600px)' },
        ]
    };
}
