import { useFormik } from 'formik';
import StyledButton from 'main/components/styled/StyledButton';
import StyledInput from 'main/components/styled/StyledInput';
import * as React from 'react';
import { IGalleryUrlQuery } from '../../model/galleryQuery';
import GalleryHeaderStyles from './GalleryHeaderStyles';

export interface IGalleryHeaderSearchFormProps {
    initialValues: IGalleryUrlQuery;
    onSubmit: (query: IGalleryUrlQuery) => void;
}

export const GalleryHeaderSearchForm = ({ initialValues, onSubmit }: IGalleryHeaderSearchFormProps) => {

    const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
        initialValues,
        onSubmit
    });

    return (
        <GalleryHeaderStyles.SearchForm onSubmit={handleSubmit}>

            <StyledInput
                id="q"
                name="q"
                aria-label="Search"
                type="text"
                onChange={handleChange}
                value={values.q || ''}
            />

            <StyledButton
                mode='inputButton'
                type="submit"
                disabled={isSubmitting}
            >
                Search
            </StyledButton>

        </GalleryHeaderStyles.SearchForm>
    );
}