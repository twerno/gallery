import fs from 'fs';
import yaml from 'js-yaml';

export interface IProperties {
    GIPHY_API?: string;
    PIXABAY_API?: string;
}

export const loadProperties = (): IProperties => {
    const file = fs.readFileSync('./properties.yaml', 'utf8');
    const result = yaml.safeLoad(file);
    return {
        GIPHY_API: process.env.GIPHY_API,
        PIXABAY_API: process.env.PIXABAY_API,
        ...result
    };
}
