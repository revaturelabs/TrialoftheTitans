import { createElement } from "lwc";
import lwcQuestion from "c/lwcQuestion";

const mockQuestions = require("./data/data.json");

/*
    Created by: Alex Bashaw
    date: 10/26/21
    test coverage:81.48%
*/

//test setup
describe("c-lwc-question", () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
  });

  //declare the element variable
  let element;

  //element creation
  beforeEach(() => {
    element = createElement("c-lwc-question", {
      is: lwcQuestion
    });
  });

  //make async work
  async function flushPromises() {
    return Promise.resolve();
  }

  //get options - Can't test as it's not public, and it's not used in the component anywhere

  //handleSetAnswer
  test("handleSetAnswer", () => {
    //expect(element.shadowRoot.querySelector("p")).not.toBeFalsy();
  });

  //handleInputAnswer
  test("handeInputAnswer", async () => {
    element.question = mockQuestions[3];
    document.body.appendChild(element);
    element.handleSetAnswer("0");
    await flushPromises();
    const input = element.shadowRoot.querySelector("lightning-input");
    input.dispatchEvent(
      new CustomEvent("change", {
        target: {
          value: mockQuestions[3]
        }
      })
    );
  });
  //handleInputAnswer combobox
  test("handeInputAnswer", async () => {
    element.question = mockQuestions[4];
    document.body.appendChild(element);
    element.handleSetAnswer("option 2||option 3");
    await flushPromises();
    const input = element.shadowRoot.querySelector("lightning-combobox");
    input.dispatchEvent(
      new CustomEvent("change", {
        target: {
          value: mockQuestions[4]
        }
      })
    );
  });

  //setDisplayQuestionTypeBoolValues
  //testing each of the cases in the switch
  test("text-area", async () => {
    element.question = mockQuestions[2];
    document.body.appendChild(element);
    element.handleSetAnswer("test");
    await flushPromises();
    expect(
      element.shadowRoot.querySelector("lightning-textarea")
    ).not.toBeFalsy();
  });

  test("input", async () => {
    element.question = mockQuestions[3];
    document.body.appendChild(element);
    element.handleSetAnswer("0");
    await flushPromises();
    expect(element.shadowRoot.querySelector("lightning-input")).not.toBeFalsy();
  });

  test("radio-group", async () => {
    element.question = mockQuestions[0];
    document.body.appendChild(element);
    element.handleSetAnswer("option 1");
    await flushPromises();
    expect(
      element.shadowRoot.querySelector("lightning-radio-group")
    ).not.toBeFalsy();
  });

  test("checkbox-group", async () => {
    element.question = mockQuestions[1];
    document.body.appendChild(element);
    element.handleSetAnswer("option 2");
    await flushPromises();
    expect(
      element.shadowRoot.querySelector("lightning-checkbox-group")
    ).not.toBeFalsy();
  });

  test("combobox", async () => {
    element.question = mockQuestions[4];
    document.body.appendChild(element);
    element.handleSetAnswer("option 2||option 3");
    await flushPromises();
    expect(
      element.shadowRoot.querySelector("lightning-combobox")
    ).not.toBeFalsy();
  });

  test("default", async () => {
    element.question = mockQuestions[5];
    document.body.appendChild(element);
    element.handleSetAnswer("FAIL");
    await flushPromises();
    expect(element.shadowRoot.querySelector("lightning-textarea")).toBeFalsy();
    expect(element.shadowRoot.querySelector("lightning-input")).toBeFalsy();
    expect(
      element.shadowRoot.querySelector("lightning-radio-group")
    ).toBeFalsy();
    expect(
      element.shadowRoot.querySelector("lightning-checkbox-group")
    ).toBeFalsy();
    expect(element.shadowRoot.querySelector("lightning-combobox")).toBeFalsy();
  });
});
