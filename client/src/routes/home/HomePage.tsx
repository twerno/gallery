import Button from 'components/styled/Button';
import Input from 'components/styled/Input';
import { Field, Formik } from 'formik';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Path } from 'routes/Path';

import HomeContainer from './components/styled/HomeContainer';
import HomeSearchForm from './components/styled/HomeSearchForm';

export interface IHomePageProps {
}

export const HomePage = (props: IHomePageProps) => {

    const history = useHistory();

    return (
        <HomeContainer>
            <h1>React Gallery</h1>
            <Formik
                initialValues={{ q: '' }}
                onSubmit={(values) => {
                    history.push(Path.galleryUrl({ q: values.q }));
                }}
            >
                {
                    ({ isSubmitting, handleSubmit, handleReset }) => (
                        <HomeSearchForm>
                            <Field name="q" as={Input} aria-label="Search" />
                            <Button type="submit" disabled={isSubmitting}>Search</Button>
                        </HomeSearchForm>
                    )
                }
            </Formik>
        </HomeContainer>
    );
}