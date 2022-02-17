import { createElement } from "lwc";
import LwcMultipleChoiceQuestion from "c/lwcMultipleChoiceQuestion";

/*
    Created By: William Rembish
    date: 10/17/2021
    test coverage: 100%
*/
describe("c-lwc-multiple-choice-question", () => {
  // after each test, reset the DOM
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  // declare the element variable
  let element;

  // before each test, set element to be an instance of the lwcMultipleChoiceQuestion component
  beforeEach(() => {
    element = createElement("c-lwc-multiple-choice-question", {
      is: LwcMultipleChoiceQuestion
    });
  });

  it("Test to make sure all values are set up correctly when there is no variables set", () => {
    // append the element to the DOM
    document.body.appendChild(element);

    // check all of the variables of the js file and the lightning-radio-group to make sure they are as expected
    expect(element.answerChoice).toBeUndefined();
    expect(element.radioGroupOptions).toBeUndefined();
    expect(element.questionprompt).toBe("");
    const radioGroup = element.shadowRoot.querySelector(
      "lightning-radio-group"
    );
    expect(radioGroup.id).toBe("input-1");
    expect(radioGroup.name).toBe("");
    expect(radioGroup.label).toBe("");
    expect(radioGroup.options).toBeUndefined();
    expect(radioGroup.value).toBeUndefined();
  });

  it("Test connectedCAllback, changeAnswer onchange event, and answer() function", () => {
    // set the variables required to be able to use the lightning-radio-group before appending the element to the DOM
    element.questionprompt = "TEST QUESTION";
    element.radioGroupOptions = "this||is||a||test";
    // append the element to the DOM
    document.body.appendChild(element);

    // check all of the variables of the js file and the lightning-radio-group to make sure they are as expected
    expect(element.answerChoice).toBeUndefined();
    expect(element.radioGroupOptions).toStrictEqual([
      { label: "this", value: "this" },
      { label: "is", value: "is" },
      { label: "a", value: "a" },
      { label: "test", value: "test" }
    ]);
    expect(element.questionprompt).toBe("TEST QUESTION");
    const radioGroup = element.shadowRoot.querySelector(
      "lightning-radio-group"
    );
    expect(radioGroup.id).toBe("input-4");
    expect(radioGroup.name).toBe("TEST QUESTION");
    expect(radioGroup.label).toBe("TEST QUESTION");
    expect(radioGroup.options).toStrictEqual([
      { label: "this", value: "this" },
      { label: "is", value: "is" },
      { label: "a", value: "a" },
      { label: "test", value: "test" }
    ]);
    expect(radioGroup.value).toBeUndefined();

    // Simulate an onchange event of someone selecting the option "this"
    radioGroup.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          value: "this"
        }
      })
    );

    // test to make sure the onchange event is performing as expected
    return Promise.resolve().then(() => {
      expect(element.answerChoice).toBe("this");
      expect(element.answer()).toBe("this");
    });
  });
});
