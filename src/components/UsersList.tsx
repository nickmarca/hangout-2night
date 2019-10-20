/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import React from 'react';
import useUsers, { User } from '../hooks/useUsers';
import useStateValue from '../hooks/useStateValue';

const containerCss = css`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const listCss = css`
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const listItemCss = css`
    height: 54px;
    border-bottom: 2px solid #f7f7f9;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &:first-of-type {
        border-top: 2px solid #f7f7f9;
    }
`;

const listItemSelectedCss = css`
    color: #155724;
    background-color: #c3e6cb;
`;

type itemProps = {
    onClick: (user: User) => void;
    user: User;
    selected: boolean;
};

const UserListItem: React.FC<itemProps> = ({ user, onClick, selected }) => (
    <li
        css={[listItemCss, selected && listItemSelectedCss]}
        style={{ cursor: 'pointer' }}
        onClick={() => onClick(user)}
    >
        {user.name}
    </li>
);

const UsersList: React.FC = () => {
    const [stateValue, dispatch] = useStateValue();
    const users = useUsers();

    const toggleSelectUser = (user: User) => {
        const { users: goingUsers } = stateValue.event!;
        const result = goingUsers.find(
            goingUser => goingUser.name === user.name
        );

        if (result) {
            dispatch({ type: 'unselect-user', payload: user });
            return;
        }
        dispatch({ type: 'select-user', payload: user });
    };

    if(!stateValue.event) {
        return(
          <div>No event created</div>
        );
    }

    const { users: goingUsers } = stateValue.event;

    return (
        <div css={containerCss}>
            <h6 className="menu-label">Who's going ? </h6>
            <ul css={listCss}>
                {users.map(user => (
                    <UserListItem
                        key={user.name}
                        user={user}
                        onClick={toggleSelectUser}
                        selected={!!goingUsers.find(user_ => user_.name === user.name)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
