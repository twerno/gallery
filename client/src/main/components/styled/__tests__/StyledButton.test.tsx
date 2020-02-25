import * as React from 'react';
import { componentBasicTests } from "test/componentBasicTests";
import StyledButton from '../StyledButton';

describe("StyledButton", () => {

    componentBasicTests("StyledButton distinct", <StyledButton mode='standalone' />);
    componentBasicTests("StyledButton inputButton", <StyledButton mode='inputButton' />);
});