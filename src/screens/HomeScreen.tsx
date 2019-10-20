/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/core';
import { useHistory } from "react-router-dom";
import useStateValue from '../hooks/useStateValue';

const containerCss = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
`;

const HomeScreen: React.FC = () => {
    const [, dispatch] = useStateValue();
    const history = useHistory();

    const onStartClick = () => {
        dispatch({ type: 'create-event', payload: undefined });
        history.push('/users');
    };

    return (
        <div css={containerCss}>
            <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={onStartClick}
            >
                Start a new Event
            </button>
        </div>
    );
};

export default HomeScreen;
