/** @jsx jsx */

import React, { Fragment } from 'react';
import { jsx, css } from '@emotion/core';
import { useHistory, Redirect } from 'react-router-dom';
import useStateValue from '../hooks/useStateValue';
import useVenues, { Venue } from '../hooks/useVenues';
import Footer from '../components/Footer';
import { canAllUsersGoToVenue } from '../services/UserService';

const containerCss = css`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 132px);
    padding-top: 25px;
    align-items: center;
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
        history.push('/');
    };

    const { users: goingUsers } = stateValue.event;

    const responses: [boolean, { reason: string }[], Venue][] = venues.map(
        venue => {
            const [isUsersGoing, reasons] = canAllUsersGoToVenue(
                goingUsers,
                venue
            );
            return [isUsersGoing, reasons, venue];
        }
    );

    const positiveResponses = responses.filter(
        ([isUsersGoing]) => isUsersGoing
    );
    const negativeResponses = responses.filter(
        ([isUsersGoing]) => !isUsersGoing
    );

    console.log('positiveResponse', positiveResponses);
    console.log('negativeResponse', negativeResponses);

    const renderPositiveVenues = (
        positiveResponses: [boolean, { reason: string }[], Venue][]
    ) => (
        <div style={{ marginBottom: 25 }}>
            <h6>Recommended Venues:</h6>
            <ul className="list-group">
                {positiveResponses.map(([, , venue]) => (
                    <li className="list-group-item list-group-item-success" key={venue.name}>
                        {venue.name}
                    </li>
                ))}
            </ul>
        </div>
    );

    const renderNegativeVenues = (
        negativeResponses: [boolean, { reason: string }[], Venue][]
    ) => (
        <div>
            <h6>Not Recommended Venues:</h6>
            <ul className="list-group">
                {negativeResponses.map(([, reasons, venue]) => (
                    <li key={venue.name} className="list-group-item list-group-item-danger">
                        {venue.name}
                        <ul>
                            {reasons.map(({ reason }) => (
                                <li key={reason}>{reason}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <Fragment>
            <div css={containerCss}>
                {renderPositiveVenues(positiveResponses)}
                {renderNegativeVenues(negativeResponses)}
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
