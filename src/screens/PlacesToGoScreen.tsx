/** @jsx jsx */

import React, { Fragment } from 'react';
import { jsx, css } from '@emotion/core';
import { useHistory, Redirect } from 'react-router-dom';
import useStateValue from '../hooks/useStateValue';
import useVenues from '../hooks/useVenues';
import Footer from '../components/Footer';
import { canUsersGoToVenue } from '../services/UserService';

const containerCss = css`
    display: flex;
    height: calc(100vh - 132px);
    padding-top: 25px;
`;

const PlacesToGoScreen: React.FC = () => {
    const [stateValue, dispatch] = useStateValue();
    const venues = useVenues();
    const history = useHistory();

    if (!stateValue.event) {
        return <Redirect to="/" />;
    }

    const onStartAgainClick = () => {
        dispatch({ type: 'delete-event', payload: undefined });
        history.push("/");
    };

    const { users: goingUsers } = stateValue.event;

    const response = venues.map(venue => {
        return canUsersGoToVenue(goingUsers, venue);
    });

    console.log(response);

    return (
        <Fragment>
            <div css={containerCss}>

            </div>
            <Footer>
                <button
                    className="btn btn-outline-primary"
                    onClick={history.goBack}
                    style={{ marginRight: 15 }}
                >
                    Back
                </button>

                <button
                    className="btn btn-outline-primary"
                    onClick={onStartAgainClick}
                >
                    Start again
                </button>
            </Footer>
        </Fragment>
    );
};

export default PlacesToGoScreen;
