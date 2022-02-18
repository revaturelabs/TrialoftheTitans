/*
    Created By: Liam Hunt
    Date: 10/17/2021
    Tests the Create Certification LWC
    Coverage: 100%
*/

import { createElement } from "lwc";
import LwcCreateCertification from "c/lwcCreateCertification";

describe("c-lwc-create-certification", () => {
  // after each test, reset the DOM
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  let element;

  beforeEach(() => {
    element = createElement("c-lwc-create-certification", {
      is: LwcCreateCertification
    });
  });

  it("Test record-form", () => {
    // append element to DOM
    document.body.appendChild(element);

    // get the lightning-record-form
    const form = element.shadowRoot.querySelector("lightning-record-form");

    // check that recordId doesn't yet exist
    expect(form.recordId).toBeFalsy();

    // simulate the onsuccess event
    form.dispatchEvent(new CustomEvent("success"));

    // check that recordId is reset to null
    return Promise.resolve().then(() => {
      expect(form.recordId).toBeFalsy();
    });
  });
    
  // Julia's tests for added button 
  // Tests for if button was clicked 
  it("buttonclicked", () => {
    document.body.appendChild(element);
    element.create = true;
    const button = element.shadowRoot.querySelector("lightning-button");
    button.dispatchEvent(new CustomEvent("click"));
    return Promise.resolve().then(() => {
      expect(element.create).toBe(false);
    });
  });
   // Tests for if button was not clickec
  it("buttonclickedfalse", () => {
    document.body.appendChild(element);
    element.create = false;
    const button = element.shadowRoot.querySelector("lightning-button");
    button.dispatchEvent(new CustomEvent("click"));

    return Promise.resolve().then(() => {
      expect(element.create).toBe(true);
    });
  });

    
});
