import '@testing-library/jest-dom/extend-expect';
import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import { componentBasicTests } from 'test/componentBasicTests';
import { LazyLoadMoreTrigger } from '../LazyLoadMoreTrigger';

describe('LazyLoadMoreTrigger', () => {

    componentBasicTests(
        "LazyLoadMoreTrigger",
        <LazyLoadMoreTrigger loadMoreCallback={() => { }} />
    );

    test("triggers callback", async () => {
        const callbackHandler = jest.fn();

        mount(<LazyLoadMoreTrigger loadMoreCallback={callbackHandler} />);

        expect(callbackHandler).toBeCalled();
    });

});

