import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
    --col-black: #212121;
    --col-pink: #FC5E97;
    --col-gray: #666666;
    --col-off-white: #FEFEFE;

    --fw-semi-bold: 600;

    --size-width-lg: 1024px;
  }

  html {
    font-size: 20px;
    color: var(--col-black);
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  h1, h2, h3, h4, h5, h6 {
      font-weight: var(--fw-semi-bold);
      margin: 0;
  }

  p {
      line-height: 1.5rem;
  }
  
  a {
      color: var(--col-pink);
  }

@media (max-width: 460px) {
    html {
        font-size: 16px;
    }
}  

@media (max-width: 360px) {
    html {
        font-size: 14px;
    }
}  
  `;

export default GlobalStyles;
