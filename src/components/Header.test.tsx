import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Header from './Header';

describe('<Header />', () => {
    it('renders properly', () => {
        const wrapper = mount(<Header />);
        expect(wrapper).to.exist;
    });
});
