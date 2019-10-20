/** @jsx jsx */

import React, { Fragment } from 'react';
import { jsx, css } from '@emotion/core';
import { useHistory, Redirect, Link } from 'react-router-dom';
import useStateValue from '../hooks/useStateValue';
import UsersList from '../components/UsersList';
import Footer from '../components/Footer';

const containerCss = css`
    display: flex;
    height: calc(100vh - 132px);
    padding-top: 25px;
`;

const SelectUsersScreen: React.FC = () => {
    const [stateValue, dispatch] = useStateValue();
    const history = useHistory();

    if (!stateValue.event) {
        return <Redirect to="/" />;
    }

    const onBackClick = () => {
        dispatch({ type: 'delete-event', payload: undefined });
        history.goBack();
    };



    return (
        <Fragment>
            <div css={containerCss}>
                <UsersList />
            </div>
            <Footer>
                <button
                    className="btn btn-outline-primary"
                    onClick={onBackClick}
                    style={{ marginRight: 15 }}
                >
                    Back
                </button>
                <Link className="btn btn-primary" to="/places-to-go">Next</Link>
            </Footer>
        </Fragment>
    );
};

export default SelectUsersScreen;
