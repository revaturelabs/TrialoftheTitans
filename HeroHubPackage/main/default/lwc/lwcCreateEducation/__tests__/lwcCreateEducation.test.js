/*
    Author: Matthew Kim
    Date Created: 10/18/2021
    Tests lwcCreateEducation
*/

import { createElement } from "lwc";
import LwcCreateEducation from "c/lwcCreateEducation";

describe("c-lwc-create-education", () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  let element;

  beforeEach(() => {
    element = createElement("c-lwc-create-education", {
      is: LwcCreateEducation
    });
  });

  it("Test the lightning-record-form", () => {
    // append the element to the DOM
    document.body.appendChild(element);

    // grab the form from the DOM
    const form = element.shadowRoot.querySelector("lightning-record-form");

    // checks that there is no recordId
    expect(form.recordId).toBeFalsy();

    // simulate the onsuccess event
    form.dispatchEvent(new CustomEvent("success"));

    // check to make sure the recordId is reset to null
    return Promise.resolve().then(() => {
      expect(form.recordId).toBeFalsy();
    });
  });
});
