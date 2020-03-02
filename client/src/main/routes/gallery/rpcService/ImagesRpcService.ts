import { IImagesApiSearchQuery } from '@shared/';
import ImagesRpc from 'main/rpc/ImagesRpc';
import LoadImagesControllerHelper from './LoadImagesControllerHelper';

export default {
    search
}

const parseErrors = (err: any): string[] => {
    let errors: string[];
    if (typeof err.message === 'string') {
        errors = [err.message];
    }
    else {
        errors = [err.toString()];
    }

    return errors;
};

async function search(
    queryParams: IImagesApiSearchQuery,
    props: { perPageLimit: number },
) {
    try {
        const val = await ImagesRpc.searchGet(queryParams);
        const images = LoadImagesControllerHelper.mapReturnModel2PreviewImg(val.data.providers);
        const limit = LoadImagesControllerHelper.computeProvidersLimits(val.data.providers, props.perPageLimit);

        return { images, limit };
    }
    catch (err) {
        throw parseErrors(err);
    }
}
