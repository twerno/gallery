import * as React from 'react';
import { componentBasicTests } from "test/componentBasicTests";
import StyledCloseButton from "../StyledCloseButton";

describe("StyledCloseButton", () => {

    componentBasicTests("StyledCloseButton", <StyledCloseButton />);
});