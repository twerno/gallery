import { wait } from '@testing-library/react';
import { mount } from 'enzyme';
import StyledInput from 'main/components/styled/StyledInput';
import * as React from 'react';
import { componentBasicTests } from "test/componentBasicTests";
import HomePageSearchForm from '../HomePageSearchForm';
import { IGalleryUrlQuery } from 'main/routes/gallery/model/galleryQuery';

describe("HomePageSearchForm", () => {

    componentBasicTests(
        "HomePageSearchForm",
        <HomePageSearchForm initialValues={{ q: '' }} onSubmit={async () => { }} />
    );

    test("submit form", async () => {
        const queryStr = 'cats';
        let submitedValues: IGalleryUrlQuery | undefined;

        const onSubmit = async (values: IGalleryUrlQuery) => { submitedValues = values }

        const wrapper = mount(
            <HomePageSearchForm
                initialValues={{ q: '' }}
                onSubmit={onSubmit}
            />
        );

        const input = wrapper.find(StyledInput);
        expect(input.exists()).toBe(true);
        await wait(() => input.simulate('change', { target: { name: "q", value: queryStr } }));

        const form = wrapper.find('form');
        expect(form.exists()).toBe(true);
        await wait(() => form.simulate('submit', {}));

        expect(submitedValues).toEqual<IGalleryUrlQuery>({ q: queryStr });
    })
});