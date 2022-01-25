import { createElement } from "lwc";
import LwcNumericalQuestionType from "c/lwcNumericalQuestionType";

/*
    Created By: William Rembish
    date: 10/17/2021
    test coverage: 100%
*/
describe("c-lwc-numerical-question-type", () => {
  // after each test, reset the DOM
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  // declare the element variable
  let element;

  // before each test, set element to be an instance of the lwcNumericalQuestionType component
  beforeEach(() => {
    element = createElement("c-lwc-numerical-question-type", {
      is: LwcNumericalQuestionType
    });
  });

  it("Test to make sure the h1 displays the correct output when no value is passed to questionprompt", () => {
    // append the element to the DOM
    document.body.appendChild(element);
    // check to make sure that the header displays the default value for questionprompt
    const header1 = element.shadowRoot.querySelector("h1");
    expect(header1.textContent).toBe("");
  });

  it("Test to make sure the h1 displays the correct output when a value is passed to questionprompt", () => {
    // before appending the element to the DOM, set the value of questionprompt
    element.questionprompt = "test";
    // append the element to the DOM
    document.body.appendChild(element);

    // check to make sure that the header displays the default value for questionprompt
    const header1 = element.shadowRoot.querySelector("h1");
    expect(header1.textContent).toBe("test");
  });

  it("Test the onchange event on the input", () => {
    // append the element to the DOM
    document.body.appendChild(element);

    // make sure that before the event is fired, the answerText is undefined
    expect(element.answerText).toBe(undefined);
    // simulate an onchange event where the value of the input is set to "Hello World"
    let inputElement = element.shadowRoot.querySelector("input");
    inputElement.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          name: "input1",
          value: "Hello World"
        }
      })
    );

    // make sure that the answerText variable's valuable is properly changed by the onchange event handler
    return Promise.resolve().then(() => {
      expect(element.answerText).toBe("Hello World");
    });
  });
});
