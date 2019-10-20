import { expect } from 'chai';
import { canUserGoToVenue } from './UserService';
import { User } from '../hooks/useUsers';
import { Venue } from '../hooks/useVenues';


describe('UserService.canUserGoToVenue', () => {
    describe('Given a User who drinks a served drink and eats a served food',  () => {
       const user: User = {
           name: 'User 1',
           drinks: ['drinkA', 'drinkB'],
           wont_eat: ['foodA'],
       };

       const venue: Venue = {
         name: 'Venue 1',
         drinks: ['drinkA'],
         food: ['foodA', 'foodB']
       };

        it('should be a positive response', () => {
            const [isUserGoing, reasons] = canUserGoToVenue(user, venue);
            expect(isUserGoing).to.be.true;
            expect(reasons).to.have.length(0);
        });
    });

    describe('Given a User who drinks a serving drink but does not eat anything served',  () => {
        const user: User = {
            name: 'User 1',
            drinks: ['drinkA', 'drinkB'],
            wont_eat: ['foodA', 'foodB'],
        };

        const venue: Venue = {
            name: 'Venue 1',
            drinks: ['drinkA'],
            food: ['foodA', 'foodB']
        };

        it('should be a negative response', () => {
            const [isUserGoing, reasons] = canUserGoToVenue(user, venue);
            expect(isUserGoing).to.be.false;
            expect(reasons).to.have.length(1);
        });
    });

    describe('Given a User who does not drink any served drink neither eat anything served',  () => {
        const user: User = {
            name: 'User 1',
            drinks: ['drinkA', 'drinkB'],
            wont_eat: ['foodA', 'foodB'],
        };

        const venue: Venue = {
            name: 'Venue 1',
            drinks: ['drinkC'],
            food: ['foodA', 'foodB']
        };

        it('should be a negative response', () => {
            const [isUserGoing, reasons] = canUserGoToVenue(user, venue);
            expect(isUserGoing).to.be.false;
            expect(reasons).to.have.length(2);
        });
    });

    describe('Given a User who drinks a served drink and eats a served food - Scenario 2',  () => {
        const user: User = {
            name: 'User 1',
            drinks: ['drinkA'],
            wont_eat: ['foodC'],
        };

        const venue: Venue = {
            name: 'Venue 1',
            drinks: ['drinkA', 'drinkB'],
            food: ['foodA', 'foodB']
        };

        it('should be a positive response', () => {
            const [isUserGoing, reasons] = canUserGoToVenue(user, venue);
            expect(isUserGoing).to.be.true;
            expect(reasons).to.have.length(0);
        });
    });
});
