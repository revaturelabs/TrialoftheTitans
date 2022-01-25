/*
    Author: Matthew Kim
    Date Created: 10/22/2021
    Date Edited: 10/26/2021
    Tests lwcHeroOneOnOne
*/

import { createElement } from "lwc";
import LwcHeroOneOnOne from "c/lwcHeroOneOnOne";

describe("c-lwc-hero-one-on-one", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("displays message on selection", () => {
    // Create element
    const element = createElement("c-lwc-hero-one-on-one", {
      is: LwcHeroOneOnOne
    });
    document.body.appendChild(element);

    // Verify displayed greeting
    return Promise.resolve().then(() => {
      const combobox = element.shadowRoot.querySelector("lightning-combobox");
      // Explicitly dispatch change event on combobox
      combobox.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            value: "A"
          }
        })
      );
      return Promise.resolve().then(() => {
        const outputElement = element.shadowRoot.querySelector(".display");
        console.log(outputElement);
        expect(outputElement).toBe(null);
      });
    });
  });
});
