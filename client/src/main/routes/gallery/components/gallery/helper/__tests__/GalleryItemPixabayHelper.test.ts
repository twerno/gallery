import { IPixabayImage } from '@shared/';
import '@testing-library/jest-dom/extend-expect';
import GalleryItemPixabayHelper from '../GalleryItemPixabayHelper';

describe('GalleryItemPixabayHelper', () => {

    test('convertToResponsivePictureProps', async () => {
        const source: IPixabayImage = {
            pageURL: 'http://example.com.not/page',
            largeImageURL: 'http://example.com.not/large.jpg',
            previewURL: 'http://example.com.not/preview.jpg',
            id: 'id',
            previewHeight: '200',
            previewWidth: '200',
            tags: 'tag1, tag2',
            webformatURL: 'http://example.com.not/webformatURL.jpg',
        };

        const responsivePicture = GalleryItemPixabayHelper.convertToResponsivePictureProps(source);
        expect(responsivePicture).toMatchSnapshot();
    });
});

