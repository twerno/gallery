import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';

export const componentBasicTests = (
    label: string,
    element: React.ReactElement
) => {

    describe(`[${label}] Component basic tests`, () => {

        test("is defined", () => {
            expect(element).toBeDefined();
        });

        test("renders the element", () => {
            const wraper = shallow(element);
            expect(wraper.isEmptyRender()).toEqual(false);
        });

        test("matches the snapshot", () => {
            const el = renderer.create(element).toJSON();
            expect(el).toMatchSnapshot();
        });

    });

}

export const componentBasicTestsWithoutStyles = (
    label: string,
    element: React.ReactElement
) => {

    describe(`[${label}] Component basic tests`, () => {

        test("is defined", () => {
            expect(element).toBeDefined();
        });

        test("renders the element", () => {
            const wraper = shallow(element);
            expect(wraper.isEmptyRender()).toEqual(false);
        });

        test("matches the snapshot", () => {
            const wraper = shallow(element);
            const expected = toJson(wraper);
            expect(expected).toMatchSnapshot();
        });

    });

}