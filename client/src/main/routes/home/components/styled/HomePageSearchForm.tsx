import { useFormik } from 'formik';
import { breakpoints } from 'main/globalStyles';
import styled from 'styled-components';
import React from 'react';
import StyledInput from 'main/components/styled/StyledInput';
import StyledButton from 'main/components/styled/StyledButton';
import { IGalleryUrlQuery } from 'main/routes/gallery/model/galleryQuery';

const StyledForm = styled.form`
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        & input {
            margin-bottom: 1rem;
        }

        @media only screen and (max-width: ${breakpoints.lg}) {

            & {
                width: 80%;
            }
        }

        @media only screen and (max-width: ${breakpoints.sm}) {

            & {
                width: 90%;
            }
        }
    `;


interface IHomePageSearchFormProps {
    initialValues: IGalleryUrlQuery;
    onSubmit: (values: IGalleryUrlQuery) => Promise<void>
}

export default ({ initialValues, onSubmit }: IHomePageSearchFormProps) => {

    const { handleChange, handleSubmit, values, isSubmitting } = useFormik({
        initialValues,
        onSubmit
    });

    return (
        <StyledForm onSubmit={handleSubmit}>

            <StyledInput
                id="q"
                name="q"
                aria-label="Search"
                type="text"
                onChange={handleChange}
                value={values.q || ''}
            />

            <StyledButton
                mode='standalone'
                type="submit"
                disabled={isSubmitting}
            >
                Search
            </StyledButton>

        </StyledForm>
    );
}
