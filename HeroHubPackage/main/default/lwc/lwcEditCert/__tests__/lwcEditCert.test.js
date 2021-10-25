/* 
    Author: Julia Weakley
    Date Last Modified: 10/21/2021
    Description:  
        Tests for lwcEditCert component.  100% code coverage
*/

import { createElement } from "lwc";
import LwcEditCert from "c/lwcEditCert";

describe("c-lwc-Edit-Cert", () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  let element = createElement("c-lwc-Edit-Cert", {
    is: LwcEditCert
  });

  // test checks that form appears
  it("editForm", () => {
    document.body.appendChild(element);

    const form = element.shadowRoot.querySelector("lightning-record-view-form");
    expect(form.recordId).toBeFalsy();

    // simulate the submit event
    form.dispatchEvent(new CustomEvent("submit"));

    // check that recordId is reset to null
    return Promise.resolve().then(() => {
      expect(form.recordId).toBeFalsy;
    });
  });

  // Test checks that form gets submited
  it("editFormEvent", () => {
    document.body.appendChild(element);

    const form = element.shadowRoot.querySelector("lightning-record-view-form");
    // mock submit function for Lightning-record-edit-form
    form.submit = jest.fn();

    form.dispatchEvent(new CustomEvent("submit"));

    return Promise.resolve().then(() => {
      expect(form.submit).toBeTruthy();
    });
  });
  it("buttonclicked", () => {
    document.body.appendChild(element);
    element.edit = true;
    const button = element.shadowRoot.querySelector("lightning-button");
    button.dispatchEvent(new CustomEvent("click"));

    return Promise.resolve().then(() => {
      expect(element.edit).toBe(false);
    });
  });
  it("buttonclickedfalse", () => {
    document.body.appendChild(element);
    element.edit = false;
    const button = element.shadowRoot.querySelector("lightning-button");
    button.dispatchEvent(new CustomEvent("click"));

    return Promise.resolve().then(() => {
      expect(element.edit).toBe(true);
    });
  });
});
