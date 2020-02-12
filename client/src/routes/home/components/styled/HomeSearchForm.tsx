import styled from 'styled-components';

export default styled.form`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media only screen and (max-width: 900px) {

        form {
            width: 75%;
        }
    }

    @media only screen and (max-width: 400px) {

        form {
            width: 90%;
        }
    }
`;
