import { createElement } from "lwc";
import LwcShortAnswerTypeQuestion from "c/lwcShortAnswerTypeQuestion";
/*
    Created By: Christopher Dirkswager
    date: 10/18/2021
    test coverage: 100%
*/

//@depreciated 10/18/21 this import was not needed
//import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';

describe("c-lwc-short-answer-type-question", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("TODO: Short answer = Here is a short answer", () => {
    const element = createElement("c-lwc-short-answer-type-question", {
      is: LwcShortAnswerTypeQuestion
    });
    document.body.appendChild(element);
    const output = Array.from(element.shadowRoot.querySelectorAll("div"))[0];

    // setting the text area to an variable
    const input = element.shadowRoot.querySelector("lightning-textarea");
    // setting the value of the text area to the hello world variable q
    input.value = "Here is a short answer";
    //expecting to get input from lightning-text area which was set previously.
    expect(element.answer()).toBe("Here is a short answer");

    //This isn't needed, but its interesting to confirm this.
    expect(output.textContent).toBe("Short Question");
  });

  it("TODO: ShortQuestion = undefined", () => {
    const element = createElement("c-lwc-short-answer-type-question", {
      is: LwcShortAnswerTypeQuestion
    });
    document.body.appendChild(element);
    //this is just confirming that this object exists, but is not defined.
    expect(element.ShortQuestion).toBeUndefined();
  });
});
