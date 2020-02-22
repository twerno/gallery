import Button from 'main/components/styled/Button';
import Input from 'main/components/styled/Input';
import { Field, Formik } from 'formik';
import * as React from 'react';
import Headroom from 'react-headroom';
import { IGalleryUrlQuery } from 'main/routes/Path';

import HeaderSearchForm from './styled/HeaderSearchForm';

export interface IGalleryHeaderProps {
    query: IGalleryUrlQuery;
    onSearchSubmitted: (query: IGalleryUrlQuery) => void;
}

export const GalleryHeader = (props: IGalleryHeaderProps) => {

    return (
        <Headroom style={{ backgroundColor: 'white', zIndex: 10 }}>

            <Formik
                initialValues={{ q: props.query.q }}
                onSubmit={
                    async (values, { setSubmitting }) => {
                        props.onSearchSubmitted({ q: values.q });
                    }
                }
            >
                {
                    ({ isSubmitting }) => (
                        <HeaderSearchForm>
                            <Field name="q" as={Input} aria-label="Search" />
                            <Button type="submit" disabled={isSubmitting} disableLeftBorder={true}>
                                Search
                            </Button>
                        </HeaderSearchForm>
                    )
                }
            </Formik>

        </Headroom >
    );
}