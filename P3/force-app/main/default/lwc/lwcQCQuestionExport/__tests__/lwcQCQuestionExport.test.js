import { createElement } from "lwc";
import LwcQCQuestionExport from "c/lwcQCQuestionExport";

/*
    Created By: William Rembish
    date: 10/17/2021
    test coverage: 100% --> because its depracated, a duplicate component that's not used
*/
describe("c-lwc-q-c-question-export", () => {
  // after each test, reset the DOM
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  // declare the element variable
  let element;

  // before each test, set element to be an instance of the lwcExamCreation component
  beforeEach(() => {
    element = createElement("c-lwc-q-c-question-export", {
      is: LwcQCQuestionExport
    });
  });

  it("Test all of the default values for variables in the js file", () => {
    // append the element to the DOM
    document.body.appendChild(element);
  });
});
