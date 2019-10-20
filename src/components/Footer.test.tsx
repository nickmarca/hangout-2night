import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Footer from './Footer';

describe('<Footer />', () => {
    it('renders properly', () => {
        const wrapper = mount(<Footer />);
        expect(wrapper).to.exist;
    });
});
