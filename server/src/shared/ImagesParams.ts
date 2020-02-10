import { ParamsDictionary } from 'express-serve-static-core';

export interface IImageQueryParams extends ParamsDictionary {
    q: string;
    offset: string;
    perPageLimit: string;
    services: 'giphy' | 'pixabay' | 'both';
}

export interface IImageQueryRespBody {
    giphy?: IGiphyReturnModel;
    pixaby?: IPixabayReturnModel;
}

export interface IGiphyReturnModel {
    data: {
        /**
         * This GIF's unique ID
         */
        id: string;

        /**
         * By default, this is almost always GIF.
         */
        type: string;

        /**
         * A URL used for embedding this GIF
         */
        embed_url: string;

        /**
         * The title that appears on giphy.com for this GIF.
         */
        title: string;

        /**
         * An object containing data for various available formats and sizes of this GIF.
         */
        images: {
            /**
             * Data on versions of this GIF with a fixed height of 200 pixels. Good for mobile use.
             */
            'fixed_height'?: {
                /**
                 * The publicly-accessible direct URL for this GIF for this size of the GIF.
                 */
                url: string;

                /**
                 * The width of this GIF in pixels.
                 */
                width: string;

                /**
                 * The height of this GIF in pixels.
                 */
                height: string;
            },

            /**
             * Data on a static image of this GIF with a fixed height of 200 pixels.
             */
            'fixed_height_still'?: {

                /**
                 * The publicly-accessible direct URL for this GIF.
                 */
                url: string;

                /**
                 * The width of this GIF in pixels.
                 */
                width: string;

                /**
                 * The height of this GIF in pixels.
                 */
                height: string;
            }
        }
    }[],
    pagination: {
        /**
         * Total number of items available (not returned on every endpoint).
         */
        total_count: number,

        /**
         * Total number of items returned.
         */
        count: number,

        /**
         * Position in pagination.
         */
        offset: number
    }
}

export interface IPixabayReturnModel {
    /**
     * The total number of hits.
     */
    total: string;
    /**
     * The number of images accessible through the API. By default, the API is limited to return a maximum of 500 images per query.
     */
    totalHits: string;
    hits: {

        /**
         * A unique identifier for this image.
         */
        id: string;

        /**
         * Source page on Pixabay, which provides a download link for the original image of the dimension imageWidth x imageHeight and the file size imageSize.
         */
        pageURL: string;

        /**
         * Low resolution images with a maximum width or height of 150 px (previewWidth x previewHeight).
         */
        previewURL: string;

        /**
         * Medium sized image with a maximum width or height of 640 px (webformatWidth x webformatHeight). URL valid for 24 hours.
         *
         *   Replace '_640' in any webformatURL value to access other image sizes:
         *   Replace with '_180' or '_340' to get a 180 or 340 px tall version of the image, respectively. Replace with '_960' to get the image in a maximum dimension of 960 x 720 px.
         */
        webformatURL: string;

        /**
         * Scaled image with a maximum width/height of 1280px.
         */
        largeImageURL: string;
    }[]
}