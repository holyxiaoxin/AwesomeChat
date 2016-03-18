import React from "react";
import { shallow } from "enzyme";

import Chat from "../Chat";

describe("<Chat/>", () => {

  const wrapper = shallow(<Chat user="some_user"/>);

  context('when state is loading', () => {
    it('should render loading text', () => {
      const Text = wrapper.find('Text');
      
      expect(Text).to.have.length(1);
    });
  });
});
