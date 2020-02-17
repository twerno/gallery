export interface IPixabayImage {
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

  previewWidth: string;
  previewHeight: string;

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

  tags: string
}

export interface IPixabayGetImageReturnModel {
  /**
   * The total number of hits.
   */
  total: string;
  /**
   * The number of images accessible through the API. By default, the API is limited to return a maximum of 500 images per query.
   */
  totalHits: string;
  hits: IPixabayImage[]
}