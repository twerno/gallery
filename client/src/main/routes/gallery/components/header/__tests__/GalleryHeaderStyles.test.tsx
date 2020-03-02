import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import * as React from 'react';
import { componentBasicTests } from 'test/componentBasicTests';
import GalleryHeaderStyles from '../GalleryHeaderStyles';

describe('GalleryHeaderStyles', () => {

    componentBasicTests(
        "SearchForm",
        <GalleryHeaderStyles.SearchForm />
    );

});

