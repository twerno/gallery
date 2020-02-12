import Button from 'components/styled/Button';
import Input from 'components/styled/Input';
import { Field, Formik } from 'formik';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Path } from 'routes/Path';

import HomeSearchForm from './components/styled/HomeSearchForm';
import styles from './homePage.module.css';

export interface IHomePageProps {
}

export const HomePage = (props: IHomePageProps) => {

    const history = useHistory();

    return (
        <div className={styles.home}>
            <h2>React Gallery</h2>
            <Formik
                initialValues={{ q: '' }}
                onSubmit={(values) => {
                    history.push(Path.galleryUrl({ q: values.q }));
                }}
            >
                {
                    ({ isSubmitting, handleSubmit, handleReset, ...props }) => (
                        <HomeSearchForm onSubmit={handleSubmit} onReset={handleReset} {...props}>
                            <Field name="q" as={Input} className={styles.spacingBottom} />
                            <Button type="submit" disabled={isSubmitting}>Search</Button>
                        </HomeSearchForm>
                    )
                }
            </Formik>
        </div>
    );
}