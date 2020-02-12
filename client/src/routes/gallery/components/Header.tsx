import Button from 'components/styled/Button';
import Input from 'components/styled/Input';
import { Field, Formik } from 'formik';
import * as React from 'react';
import Headroom from 'react-headroom';
import { useHistory } from 'react-router-dom';
import { Path } from 'routes/Path';

import HeaderSearchForm from './styled/HeaderSearchForm';

export interface IGalleryHeaderProps {
    query: string;
}

export const GalleryHeader = (props: IGalleryHeaderProps) => {

    const history = useHistory();

    return (
        <Headroom style={{ backgroundColor: 'white', zIndex: 10 }}>

            <Formik
                initialValues={{ q: props.query }}
                onSubmit={async (values) => {
                    history.push(Path.galleryUrl(values.q));
                }}
            >
                {
                    ({ isSubmitting, handleSubmit }) => (
                        <HeaderSearchForm onSubmit={handleSubmit}>

                            <Field name="q" as={Input} />

                            <Button type="submit" disabled={isSubmitting} disableLeftBorder={true}>
                                Search
                            </Button>

                        </HeaderSearchForm>
                    )
                }
            </Formik>

        </Headroom>
    );
}