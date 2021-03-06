import { createElement } from "lwc";
import LwcTrueFalseQuestion from "c/lwcTrueFalseQuestion";

describe("c-lwc-true-false-question", () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  let element;

  beforeEach(() => {
    element = createElement("c-lwc-true-false-question", {
      is: LwcTrueFalseQuestion
    });
    document.body.appendChild(element);
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  it("TODO: test case generated by CLI command, please fill in test logic", async () => {
    element.shadowRoot.querySelector("lightning-radio-group").value = 'option2';
    await flushPromises();
    element.shadowRoot.querySelector("lightning-radio-group").dispatchEvent(new CustomEvent("change", {detail:{value:'option1'}}));
    await flushPromises();
    console.log(element.shadowRoot.querySelector("lightning-radio-group").value);
    expect(element.answer()).toBe('option1');
  });
  
});
