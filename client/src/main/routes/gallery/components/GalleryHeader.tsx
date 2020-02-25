import Input from 'main/components/styled/StyledInput';
import { Field, Formik } from 'formik';
import * as React from 'react';
import Headroom from 'react-headroom';
import { IGalleryUrlQuery } from 'main/routes/Path';

import HeaderSearchForm from './styled/HeaderSearchForm';
import StyledButton from 'main/components/styled/StyledButton';

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
                            <StyledButton type="submit" disabled={isSubmitting} mode='inputButton'>
                                Search
                            </StyledButton>
                        </HeaderSearchForm>
                    )
                }
            </Formik>

        </Headroom >
    );
}