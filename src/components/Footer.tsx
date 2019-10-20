/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import React from 'react'

const containerCss = css`
    height: 76px;
    width: 100vw;
    background-color: #f7f7f7; 
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 35px; 
`;

const Footer: React.FC = ({ children }) => {
    return (
        <div css={containerCss}>
            { children }
        </div>
    );
};

export default Footer;
