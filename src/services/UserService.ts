import { User } from '../hooks/useUsers';
import { Venue } from '../hooks/useVenues';

// The business logic I'm assuming is the following:
//
// A given user is willing to go to a venue
//
// 1 => The user don't eat any of the serving food at a venue
//
// AND
//
// 2 => A given user has at least one drink on its 'drinks' property which is also included on 'drinks' property of a venue
//

export function canUserGoToVenue(
    user: User,
    venue: Venue
): [boolean, { reason: string }[]] {
    const hasSomethingForUserEat = !venue.food.every(
        food =>
            !!user.wont_eat.find(
                wont_eat =>
                    food.toLocaleLowerCase() === wont_eat.toLocaleLowerCase()
            )
    );

    const hasSomethingForUserDrink = !!user.drinks.find(drink =>
        venue.drinks.find(
            venue_drink =>
                venue_drink.toLocaleLowerCase() === drink.toLocaleLowerCase()
        )
    );

    const reason1 = hasSomethingForUserDrink
        ? []
        : [{ reason: `There's nothing for ${user.name} to drink` }];
    const reason2 = hasSomethingForUserEat
        ? []
        : [{ reason: `There's nothing for ${user.name} to eat` }];

    return [
        hasSomethingForUserDrink && hasSomethingForUserEat,
        [...reason1, ...reason2],
    ];
}

export function canAllUsersGoToVenue(
    users: User[],
    venue: Venue
): [boolean, { reason: string }[]] {
    const canUsersGoToVenue = users.map(user => canUserGoToVenue(user, venue));

    return canUsersGoToVenue.reduce(
        ([isUsersGoing, allUsersReasons], [isUserGoing, reasons]) => {
            return [
                isUsersGoing && isUserGoing,
                allUsersReasons.concat(reasons),
            ];
        },
        [true, []]
    );
}
