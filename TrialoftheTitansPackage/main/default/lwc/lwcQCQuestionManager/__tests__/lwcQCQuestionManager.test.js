import { createElement } from "lwc";
import LwcQCQuestionManager from "c/lwcQCQuestionManager";

/*
    Created By: William Rembish
    Date: 10/17/2021
    Code Coverage: 100%
*/
describe("c-lwc-q-c-question-manager", () => {
  // after each test, reset the DOM
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("Test to make sure everything has the expected labels", () => {
    // add an element that is an instance of the lwcQCQuestionManager component to the DOM
    const element = createElement("c-lwc-q-c-question-manager", {
      is: LwcQCQuestionManager
    });
    document.body.appendChild(element);

    // check to make sure the tabset's variant is set to "scoped"
    const tabset = element.shadowRoot.querySelector("lightning-tabset");
    expect(tabset.variant).toBe("scoped");

    // check to make sure each tab has the correct label
    const tabs = Array.from(
      element.shadowRoot.querySelectorAll("lightning-tab")
    );
    expect(tabs[0].label).toBe("Create Question");
    expect(tabs[1].label).toBe("Edit/Delete/Export Questions");
    expect(tabs[2].label).toBe("Import Questions");
  });
});
