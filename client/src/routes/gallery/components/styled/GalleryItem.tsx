import styled from 'styled-components';

export default styled.div`
    margin: 1px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    height: 200px;

    @media only screen and (max-width: 600px) {

        & {
            height: 100px;
        }
    }
`;
