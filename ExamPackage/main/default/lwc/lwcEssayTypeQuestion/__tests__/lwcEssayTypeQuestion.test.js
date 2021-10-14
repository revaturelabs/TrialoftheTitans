// author: john glennan

import { createElement } from "lwc";
import LwcEssayTypeQuestion from "c/lwcEssayTypeQuestion";

describe("c-lwc-essay-type-question", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("Inserts hello world! into essayQuestion", () => {
    const element = createElement("c-lwc-essay-type-question", {
      is: LwcEssayTypeQuestion
    });

    document.body.appendChild(element);

    // Setting the essay question to hello world
    let q = (element.essayQuestion = "Hello, World!");

    // setting the text area to an variable
    const elementChange =
      element.shadowRoot.querySelector("lightning-textarea");
    // setting the value of the text area to the hello world variable q
    elementChange.value = q;
    // dispatch the change event
    elementChange.dispatchEvent(new CustomEvent("change"));

    // logs to check if the value of the text area is the same as the essay question
    console.log(element.essayQuestion);
    console.log(element.essayAnswer);

    // setting expectations
    expect(element.essayAnswer).toBe("Hello, World!");
  });
});
