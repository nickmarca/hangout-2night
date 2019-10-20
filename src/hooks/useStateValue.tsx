import React, {
    createContext,
    Dispatch,
    ReactElement,
    useContext,
    useReducer,
} from 'react';

import { User } from './useUsers';

export interface EventState {
    users: User[];
}

export interface StateValue {
    event: EventState | undefined;
}

export interface StateValueAction {
    type: string;
    payload: any;
}

function selectUser(event: EventState, user: User): EventState {
    const newUsers = [...event.users, user];
    return {
        users: newUsers,
    };
}

function unselectUser(event: EventState, user: User): EventState {
    const newUsers = event.users.filter(user_ => user.name !== user_.name);
    return {
        users: newUsers,
    };
}

function reducer(state: StateValue, action: StateValueAction): StateValue {
    switch (action.type) {
        case 'create-event':
            return { event: { users: [] } };
        case 'delete-event':
            return { event: undefined };
        case 'select-user':
            return { event: selectUser(state.event!, action.payload) };
        case 'unselect-user':
            return { event: unselectUser(state.event!, action.payload) };
        default:
            return state;
    }
}

const initialDispatch: Dispatch<StateValueAction> = () => {};

export const StateContext = createContext<
    [StateValue, Dispatch<StateValueAction>]
>([{ event: undefined }, initialDispatch]);

export const StateProvider = ({
    initialState,
    children,
}: {
    initialState: StateValue;
    children: ReactElement;
}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export default () => useContext(StateContext);
