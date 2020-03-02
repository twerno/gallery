import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import { componentBasicTests } from 'test/componentBasicTests';
import { GalleryHeader, IGalleryHeaderProps } from '../GalleryHeader';
import { GalleryHeaderSearchForm } from '../GalleryHeaderSearchForm';

describe('GalleryHeader', () => {

    const props: IGalleryHeaderProps = {
        initialValues: { q: 'cats' },
        onSubmit: (_) => { },
    };

    componentBasicTests(
        "GalleryHeader",
        <GalleryHeader {...props} />
    );

    test("passing props", async () => {
        const wrapper = shallow(<GalleryHeader {...props} />);
        const searchForm = wrapper.find(GalleryHeaderSearchForm);

        expect(searchForm.props().initialValues).toBe(props.initialValues);
        expect(searchForm.props().onSubmit).toBe(props.onSubmit);
    });

});

