import { ILocalGiphyGetImageReturnModel, ILocalPixabayGetImageReturnModel } from '@shared/';

export abstract class AbstractImageProviderPaginator<T> {

    public totalPages: number | undefined = undefined;

    public constructor(public readonly perPageLimit: number) { }

    public hasMorePages(pageIdx: number) {
        return this.totalPages === undefined || pageIdx < this.totalPages;
    }

    public clear() {
        this.totalPages = undefined;
    }

    public abstract computeTotalPages(model: T): void;
}

export class PixabyPaginator extends AbstractImageProviderPaginator<ILocalPixabayGetImageReturnModel> {

    public computeTotalPages(model: ILocalPixabayGetImageReturnModel) {
        if (this.totalPages !== undefined) { return; }

        const total = +model.total;
        this.totalPages = Math.floor(total / this.perPageLimit) + (total % this.perPageLimit > 0 ? 1 : 0);
    }
}

export class GiphyPaginator extends AbstractImageProviderPaginator<ILocalGiphyGetImageReturnModel> {

    public computeTotalPages(model: ILocalGiphyGetImageReturnModel) {
        if (this.totalPages !== undefined) { return; }

        const total = +model.pagination.total_count || +model.pagination.count;
        this.totalPages = Math.floor(total / this.perPageLimit) + (total % this.perPageLimit > 0 ? 1 : 0);
    }
}

export const PaginatorHelper = {
    computeTotalPixabayPages: (model: ILocalPixabayGetImageReturnModel, imagesPerPage: number) => {
        const total = +model.total;
        return Math.floor(total / imagesPerPage) + (total % imagesPerPage > 0 ? 1 : 0);
    },

    computeTotalGiphyPages: (model: ILocalGiphyGetImageReturnModel, imagesPerPage: number) => {
        const total = +model.pagination.total_count || +model.pagination.count
        return Math.floor(total / imagesPerPage) + (total % imagesPerPage > 0 ? 1 : 0);
    },
}