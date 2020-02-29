import '@testing-library/jest-dom/extend-expect';
import { IGiphyImage } from '@shared/';
import GalleryItemGiphyHelper from '../GalleryItemGiphyHelper';

describe('GalleryItemGiphyHelper', () => {

    test('convertToResponsivePictureProps', async () => {
        const source: IGiphyImage = {
            embed_url: 'embed_url',
            id: 'id',
            images: {
                fixed_height_small_still: {
                    height: '200',
                    url: 'http://example.com.not/image-150.jpg',
                    width: '150'
                },
                original: {
                    height: '300',
                    url: 'http://example.com.not/image-200.jpg',
                    width: '200'
                },
                fixed_height_still: {
                    height: '200',
                    url: 'http://example.com.not/image-300.jpg',
                    width: '300'
                },
            },
            title: 'title',
            type: 'type'
        };

        const responsivePicture = GalleryItemGiphyHelper.convertToResponsivePictureProps(source);
        expect(responsivePicture).toMatchSnapshot();
    });
});

