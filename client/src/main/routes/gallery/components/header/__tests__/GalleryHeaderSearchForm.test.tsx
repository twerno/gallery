import '@testing-library/jest-dom/extend-expect';
import { wait } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import StyledInput from 'main/components/styled/StyledInput';
import * as React from 'react';
import { componentBasicTests } from 'test/componentBasicTests';
import { GalleryHeaderSearchForm, IGalleryHeaderSearchFormProps } from '../GalleryHeaderSearchForm';
import GalleryHeaderStyles from '../GalleryHeaderStyles';

describe('GalleryHeaderSearchForm', () => {

    const props: IGalleryHeaderSearchFormProps = {
        initialValues: { q: 'cats' },
        onSubmit: (_) => { },
    };

    componentBasicTests(
        "GalleryHeaderSearchForm",
        <GalleryHeaderSearchForm {...props} />
    );

    componentBasicTests(
        "GalleryHeaderSearchForm",
        <GalleryHeaderSearchForm {...props} initialValues={{ q: undefined }} />
    );

    test("submitting", async () => {
        const onSubmit = jest.fn();
        const wraper = shallow(<GalleryHeaderSearchForm initialValues={{ q: 'cats' }} onSubmit={onSubmit} />);

        await wait(() => wraper.find(GalleryHeaderStyles.SearchForm).simulate('submit', {}));
        expect(onSubmit).toBeCalledTimes(1);
        expect(onSubmit).toBeCalledWith({ q: 'cats' }, expect.anything());
    });

    test("edit query and submit", async () => {
        const onSubmit = jest.fn();
        const wraper = mount(<GalleryHeaderSearchForm initialValues={{ q: undefined }} onSubmit={onSubmit} />);

        const input = wraper.find(StyledInput);
        await wait(() => input.simulate('change', { target: { name: "q", value: 'cats' } }));

        const form = wraper.find(GalleryHeaderStyles.SearchForm);
        await wait(() => form.simulate('submit', {}));
        expect(onSubmit).toBeCalledTimes(1);
        expect(onSubmit).toBeCalledWith({ q: 'cats' }, expect.anything());
    });

});

