import styled, { css } from 'styled-components';

interface IButtonProps {
    disableLeftBorder?: boolean;
}

export default styled.button<IButtonProps>`
    padding: 9px 18px;
    background-color: transparent;
    color: black;
    border: 1px solid #cecece;
    border-radius: 5px;

    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.75px;

    &:focus {
        outline-color: rgb(103, 156, 226);
    }

    ${props => props.disableLeftBorder && css`
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    `}

`;
