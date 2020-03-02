import styled from 'styled-components';

const LoadMoreRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    overflow-x: hidden;
    position: relative;
    left: 0px;
    right: 0px;
    margin: 0px 10px;
    height: 100px;

    &::after {
        content: '';
        flex-grow: 999999999;
        height: 0;
    }
`;


export default {
    LoadMoreRow
};
