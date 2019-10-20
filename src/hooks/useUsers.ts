import { useEffect, useState } from 'react';
import usersJson from '../data/users.json';

export interface User {
    "name": string,
    "wont_eat": string[],
    "drinks": string[]
}

function useUsers() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        setUsers(usersJson);
    }, []);

    return users;
}

export default useUsers;
