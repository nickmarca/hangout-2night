import { useEffect, useState } from 'react';
import venuesJson from '../data/venues.json';

export interface Venue {
    "name": string,
    "food": string[],
    "drinks": string[],
}

function useUsers() {
    const [venues, setVenues] = useState<Venue[]>([]);

    useEffect(() => {
        setVenues(venuesJson);
    }, []);

    return venues;
}

export default useUsers;
