import { compile } from 'path-to-regexp';
import { stringify } from 'query-string';

const RouteUtils = {
    makeUrl,
    makeQueryFromMap
}

export default RouteUtils;

function makeUrl(path: string, props: any, queryMap?: any): string {
    return compile(path)(props) + makeQueryFromMap(queryMap);
}

function makeQueryFromMap(queryMap?: any): string {

    // FIXME - is stringify a safe aproach ?
    return queryMap
        ? '?' + stringify(queryMap)
        : '';
}