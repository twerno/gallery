import styled from 'styled-components';

export default styled.button`
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    margin: 1.5rem;
    background: rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.75);
    position: relative;
    transform: scale(1.5);

    ::before, ::after {
        content: '';
        background-color: white;
        width: 0.25rem;
        height: 1.5rem;
        position: absolute;
        left: .7rem;
        top: 0px;
        box-shadow: 0px 0px 28px -3px rgba(0,0,0,0.75);
    }

    ::before {
        transform: rotate(45deg);
    } 
    
    ::after {
        transform: rotate(-45deg);
    }

`;
