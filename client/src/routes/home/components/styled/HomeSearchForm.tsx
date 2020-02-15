import { Form } from 'formik';
import { breakpoints } from 'globalStyles';
import styled from 'styled-components';

export default styled(Form)`
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
