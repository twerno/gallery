import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Path } from 'routes/Path';

import styles from './homePage.module.css';

export interface IHomePageProps {
}

export const HomePage = (props: IHomePageProps) => {

    const history = useHistory();

    return (
        <div className={styles.home}>
            <h2>What are you fooking for</h2>
            <Formik
                initialValues={{ q: '' }}
                onSubmit={(values) => {
                    history.push(Path.galleryUrl(values.q));
                }}
            >
                {
                    ({ isSubmitting }) => (
                        <Form>
                            <Field name="q" as="input" />
                            <button type="submit" disabled={isSubmitting}>Search</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
}