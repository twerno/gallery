import styled from 'styled-components';

export default styled.form`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media only screen and (max-width: 900px) {

        & {
            width: 80%;
        }
    }

    @media only screen and (max-width: 400px) {

        & {
            width: 90%;
        }
    }
`;
