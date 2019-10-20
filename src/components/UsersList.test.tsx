import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import UsersList from './UsersList';

describe('<UsersList />', () => {

    it('renders properly', () => {
        const wrapper = mount(<UsersList />);
        expect(wrapper).to.exist;
    });
});
