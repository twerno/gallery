import '@testing-library/jest-dom/extend-expect';
import { wait } from '@testing-library/react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import { componentBasicTests } from 'test/componentBasicTests';
import { HomePage } from '../HomePage';
import { Path } from 'main/routes/Path';

const historyMock = {
    location: {},
    push: jest.fn(),
};

jest.mock('react-router-dom', () => ({
    useHistory: () => historyMock,
}));

describe('HomePage', () => {

    beforeEach(() => {
        historyMock.push.mockClear();
    })

    componentBasicTests("HomePage", <HomePage />);
    componentBasicTests("HomePage", <HomePage initialQuery={{ q: 'cats' }} />);

    test('searching for cats', async () => {

        const wrapper = mount(
            <HomePage initialQuery={{ q: 'cats' }} />
        );

        await wait(() => wrapper.find('form').simulate('submit'));

        expect(historyMock.push).toBeCalledWith(Path.galleryUrl({ q: 'cats' }));
    });

    test('searching for dogs', async () => {

        const wrapper = mount(
            <HomePage initialQuery={{ q: 'dogs' }} />
        );

        await wait(() => wrapper.find('form').simulate('submit'));

        expect(historyMock.push).toBeCalledWith(Path.galleryUrl({ q: 'dogs' }));
        expect(historyMock.push).not.toBeCalledWith(Path.galleryUrl({ q: 'cats' }));
    });

});

