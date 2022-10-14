const { createGlobalStyle } = require('styled-components')
import styled from 'styled-components'

const GlobalStyle = createGlobalStyle`
:root{
    --pink: #ff9ff3;
    --yellow: #feca57; 
    --red: #ff6b6b;
    --blue:#48dbfb;
    --green: #1dd1a1;
    --dark: #1e272e;
    --ligth: #ffffff;
}

*,*::after,*::before{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    overflow-x: hidden;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--dark);
    min-height: 100vh;
}
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
`

export default GlobalStyle