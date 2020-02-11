import { IMap } from '@shared/';
import { compile } from 'path-to-regexp';
import { stringify } from 'query-string';

const RouteUtils = {
    makeUrl,
}

export default RouteUtils;

function makeUrl(path: string, props: any, queryString?: IMap<string>): string {

    // FIXME - is stringify a safe aproach ?
    const q = queryString
        ? '?' + stringify(queryString)
        : '';

    return compile(path)(props) + q;
}