import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import * as React from 'react';
import { componentBasicTests } from 'test/componentBasicTests';
import LazyLoadMoreStyles from '../LazyLoadMoreStyles';

describe('LazyLoadMoreStyles', () => {

    componentBasicTests(
        "LazyLoadMoreStyles.LoadMoreRow",
        <LazyLoadMoreStyles.LoadMoreRow />
    );

});

