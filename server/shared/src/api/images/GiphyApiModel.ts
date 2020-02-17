interface IGiphyImgData {
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
}

export interface IGiphyImage {
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
        'fixed_height'?: IGiphyImgData

        /**
         * Data on a static image of this GIF with a fixed height of 200 pixels.
         */
        'fixed_height_still'?: IGiphyImgData,

        /**
         * Data on versions of this GIF with a fixed height of 100 pixels. Good for mobile keyboards.
         */
        'fixed_height_small'?: IGiphyImgData,

        /**
         * Data on a static image of this GIF with a fixed height of 100 pixels.
         */
        'fixed_height_small_still': IGiphyImgData,

        /**
         * Data on the original version of this GIF. Good for desktop use.
         */
        'original': IGiphyImgData
    }
}

export interface IGiphyGetImageReturnModel {
    data: IGiphyImage[],
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