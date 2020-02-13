import fs from 'fs';
import yaml from 'js-yaml';

export interface IProperties {
    GIPHY_API?: string;
    PIXABAY_API?: string;
}

export const loadProperties = () => {
    return {
        ...propertiesFromEnv(),
        ...propertiesFromYaml()
    };
}

export const propertiesFromEnv = (): IProperties => {
    return {
        GIPHY_API: process.env.GIPHY_API,
        PIXABAY_API: process.env.PIXABAY_API
    };
}

export const propertiesFromYaml = (): IProperties => {
    try {
        const file = fs.readFileSync('./properties.yaml', 'utf8');
        return yaml.safeLoad(file);
    } catch (e) {
        console.log('[Error] properties.yaml not found');
    }
    return {};
}
