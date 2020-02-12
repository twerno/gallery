import * as React from 'react';
import Headroom from 'react-headroom';

import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { Path } from 'routes/Path';

import style from './Header.module.css';


export interface IGalleryHeaderProps {
    query: string;
}

export const GalleryHeader = (props: IGalleryHeaderProps) => {

    const history = useHistory();

    return (
        <Headroom className={style.headroomWrapper} style={{ backgroundColor: 'white', zIndex: 10 }}>

            <Formik
                initialValues={{ q: props.query }}
                onSubmit={async (values) => {
                    history.push(Path.galleryUrl(values.q));
                }}
            >
                {
                    ({ isSubmitting }) => (
                        <Form className={style.searchForm}>

                            <Field name="q" as="input" className={style.searchInput} />

                            <button type="submit" disabled={isSubmitting} className={style.searchButton}>
                                Search
                            </button>
                        </Form>
                    )
                }
            </Formik>

        </Headroom>
    );
}