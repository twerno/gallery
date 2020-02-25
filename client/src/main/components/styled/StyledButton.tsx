import styled, { css } from 'styled-components';

export interface IStyledButtonProps {
    mode: 'standalone' | 'inputButton';
}

export default styled.button<IStyledButtonProps>`
    padding: 9px 18px;
    background-color: transparent;
    color: black;
    border: 1px solid #cecece;
    border-radius: ${isStandalone('5px', '0')};
    border-left: ${isStandalone('', 'none')};

    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.75px;

    &:focus {
        outline-color: rgb(103, 156, 226);
    }
`;

function isStandalone(trueStatement: string, falseStatement?: string) {
    return (props: IStyledButtonProps) =>
        props.mode === 'standalone'
            ? trueStatement
            : falseStatement || "unset";
}
