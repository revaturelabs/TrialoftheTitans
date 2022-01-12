/*
    Created By: Liam Hunt
    Date: 10/20/2021
    Tests the Edit Education LWC 
    Coverage: 
*/

import { createElement } from "lwc";
import lwcEditEdu from "c/lwcEditEdu";

describe("c-lwc-edit-edu", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("renders lightning-record-edit-form with given input values", () => {
    const RECORD_ID_INPUT = "0031700000pJRRSAA4";
    const OBJECT_API_NAME_INPUT = "Education__c";

    // Create initial element
    const element = createElement("c-lwc-edit-edu", {
      is: lwcEditEdu
    });
    // Set public properties
    element.recordId = RECORD_ID_INPUT;
    element.objectApiName = OBJECT_API_NAME_INPUT;
    document.body.appendChild(element);

    // Validate if correct parameters have been passed to base components
    const formEl = element.shadowRoot.querySelector(
      "lightning-record-edit-form"
    );
    expect(formEl.recordId).toBe(RECORD_ID_INPUT);
    expect(formEl.objectApiName).toBe(OBJECT_API_NAME_INPUT);

    // Validate if submit button is defined
    const buttonEl = element.shadowRoot.querySelector("lightning-button");
    expect(buttonEl.type).toBe("submit");
    expect(buttonEl.label).toBe("Update");
  });

  it("renders given lightning-output-fields", () => {
    const INPUT_FIELDS = [
      "Name",
      "Degree__c",
      "Major__c",
      "DateGraduate__c",
      "Gpa__c",
      "Image_URL__c"
    ];
    const RECORD_ID_INPUT = "0031700000pJRRSAA4";
    const OBJECT_API_NAME_INPUT = "Education__c";

    // Create initial element
    const element = createElement("c-lwc-edit-edu", {
      is: lwcEditEdu
    });
    // Set public properties
    element.recordId = RECORD_ID_INPUT;
    element.objectApiName = OBJECT_API_NAME_INPUT;
    document.body.appendChild(element);

    // Select elements for validation
    const outputFieldNames = Array.from(
      element.shadowRoot.querySelectorAll("lightning-input-field")
    ).map((outputField) => outputField.fieldName);
    expect(outputFieldNames).toEqual(INPUT_FIELDS);
  });
});
