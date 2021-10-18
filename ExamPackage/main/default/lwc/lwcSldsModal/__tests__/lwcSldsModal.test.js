/*
Author: Veselin Georgiev
Date: 10/15/2021

*/

import { createElement } from "lwc";
import LwcSldsModal from "c/lwcSldsModal";

describe("c-lwc-slds-modal", () => {
  let component;

  // creating component element and append to the DOM
  beforeEach(() => {
    component = createElement("c-lwc-slds-modal", {
      is: LwcSldsModal
    });
    document.body.appendChild(component);
  });

  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("When button is clicked - expecting Class name", () => {
    const myButton = component.shadowRoot.querySelector("lightning-button");
    myButton.dispatchEvent(new CustomEvent("click"));

    let section = component.shadowRoot.querySelector("section");

    return Promise.resolve().then(() => {
      expect(section.className).toBe("slds-modal slds-fade-in-open");
    });
  });

  it("When button is not clicked - another class name expecting", () => {
    let section = component.shadowRoot.querySelector("section");

    expect(section.className).toBe("slds-modal");
  });

  it("When button is clicked - and then Modal closed", () => {
    const myButton = component.shadowRoot.querySelector("lightning-button");
    myButton.dispatchEvent(new CustomEvent("click"));

    component.closeModal();

    let section = component.shadowRoot.querySelector("section");

    return Promise.resolve().then(() => {
      expect(section.className).toBe("slds-modal");
    });
  });

  it("Except the modal to be visible", () => {
    let section = component.shadowRoot.querySelector("section");

    let allButtons = Array.from(
      component.shadowRoot.querySelectorAll("lightning-button")
    );
    let closeBtn = allButtons[1];

    closeBtn.dispatchEvent(new CustomEvent("click"));

    component.showModal();

    return Promise.resolve().then(() => {
      expect(section.className).toBe("slds-modal slds-fade-in-open");
    });
  });

  it("Checking last Div class name ", () => {
    let firstBtn = component.shadowRoot.querySelector("lightning-button");
    firstBtn.dispatchEvent(new CustomEvent("click"));

    let allDivs = Array.from(component.shadowRoot.querySelectorAll("div"));
    let lastDiv = allDivs.pop();

    return Promise.resolve().then(() => {
      expect(lastDiv.className).toBe("slds-backdrop slds-backdrop_open");
    });
  });

  it("Checking the @api showButtonText property ", () => {
    let firstBtn = component.shadowRoot.querySelector("lightning-button");
    firstBtn.dispatchEvent(new CustomEvent("click"));

    component.showButtonText = "testing property";

    return Promise.resolve().then(() => {
      expect(firstBtn.title).toBe("testing property");
    });
  });

  it("Checking the @api modalHeader ", () => {
    component.shadowRoot
      .querySelector("lightning-button")
      .dispatchEvent(new CustomEvent("click"));
    let modalH2 = component.shadowRoot.querySelector("h2");
    component.modalHeader = "testing h2 modal";

    return Promise.resolve().then(() => {
      expect(modalH2.textContent).toBe("testing h2 modal");
    });
  });

  it("Checking the @api modalContent ", () => {
    component.shadowRoot
      .querySelector("lightning-button")
      .dispatchEvent(new CustomEvent("click"));
    let pElement = component.shadowRoot.querySelector("p");
    component.modalContent = "sick";

    return Promise.resolve().then(() => {
      expect(pElement.textContent).toBe("sick");
    });
  });

  it("Testing the handleConfirmClick button ", () => {
    let allButtons = Array.from(
      component.shadowRoot.querySelectorAll("lightning-button")
    );
    let myBtn = allButtons[2];
    myBtn.dispatchEvent(new CustomEvent("click"));
    let section = component.shadowRoot.querySelector("section");

    return Promise.resolve().then(() => {
      expect(section.className).toBe("slds-modal");
    });
  });
});
