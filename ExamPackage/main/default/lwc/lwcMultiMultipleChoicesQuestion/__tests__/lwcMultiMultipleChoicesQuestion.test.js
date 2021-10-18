import { createElement } from "lwc";
import LwcMultiMultipleChoicesQuestion from "c/lwcMultiMultipleChoicesQuestion";

/*
    Created By: William Rembish
    date: 10/17/2021
    test coverage: 100%
*/
describe("c-lwc-multi-multiple-choices-question", () => {
  // after each test, reset the DOM
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  // declare the element variable
  let element;

  // before each test, set element to be an instance of the lwcMultiMultipleChoicesQuestion component
  beforeEach(() => {
    element = createElement("c-lwc-multi-multiple-choices-question", {
      is: LwcMultiMultipleChoicesQuestion
    });
  });

  it("Test to make sure the lightning-checkbox-group is correctly setup when no values are set", () => {
    document.body.appendChild(element);

    expect(element.questionprompt).toBeUndefined();
    const checkboxGroup = element.shadowRoot.querySelector(
      "lightning-checkbox-group"
    );
    expect(checkboxGroup.name).toBeUndefined();
    expect(checkboxGroup.label).toBeUndefined();
    expect(checkboxGroup.options).toBeUndefined();
    expect(checkboxGroup.value).toBeUndefined();
  });

  it("Test to make sure the lightning-checkbox-group is correctly setup when questionprompt is set", () => {
    element.questionprompt = "TEST";
    document.body.appendChild(element);

    expect(element.questionprompt).toBe("TEST");
    const checkboxGroup = element.shadowRoot.querySelector(
      "lightning-checkbox-group"
    );
    expect(checkboxGroup.name).toBe("TEST");
    expect(checkboxGroup.label).toBe("TEST");
    expect(checkboxGroup.options).toBeUndefined();
    expect(checkboxGroup.value).toBeUndefined();
  });

  it("Test to ensure the onchange event functions properly", () => {
    // set the necessary variables before appending the element to the DOM
    element.questionprompt = "TEST";
    element.checkGroupOptions = "this||is||a||test";
    // append the element to the DOM
    document.body.appendChild(element);

    // make sure that all of the elements of the checkboxGroup are assigned correctly
    expect(element.questionprompt).toBe("TEST");
    const checkboxGroup = element.shadowRoot.querySelector(
      "lightning-checkbox-group"
    );
    expect(checkboxGroup.name).toBe("TEST");
    expect(checkboxGroup.label).toBe("TEST");
    expect(checkboxGroup.options).toStrictEqual([
      { label: "this", value: "this" },
      { label: "is", value: "is" },
      { label: "a", value: "a" },
      { label: "test", value: "test" }
    ]);
    expect(checkboxGroup.value).toBeUndefined();

    // simulate an onchange event where this and is are selected
    checkboxGroup.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          value: ["this", "is"]
        }
      })
    );

    // check to make sure the onchange function performed as expected
    return Promise.resolve().then(() => {
      expect(element.answerChoices).toBe("this||is");
      expect(element.answer()).toBe("this||is");
    });
  });
});
