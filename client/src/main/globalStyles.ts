import { createGlobalStyle } from 'styled-components';

export const breakpoints = {
    /**
     * 400px
     */
    sm: '400px',

    /**
     * 600px
     */
    md: '600px',

    /**
     * 900px
     */
    lg: '900px',
};



export const GlobalStyle = createGlobalStyle`

    body {
        font-size: 16 px;
    }
    
    h1 {
        font-size: 4rem;
        margin-bottom: 1rem;
        font-family: sans-serif;
    }


    @media only screen and (max-width: ${breakpoints.md}) {

        html {
            font-size: 14px;
        }
    }

    
    @media only screen and (max-width: ${breakpoints.sm}) {

        html {
            font-size: 10px;
        }
    }

    .noScroll {
        overflow: hidden;
    }

`;
