import { createElement } from "lwc";
import LwcQCQuestionEdit from "c/lwcQCQuestionEdit";
import getQuestion from "@salesforce/apex/QCQuestionEditController.getQuestion";
import { registerTestWireAdapter } from "@salesforce/sfdx-lwc-jest";
import getQCQuestions from "@salesforce/apex/QCQuestionExportApexController.getQCQuestions";

// Mock realistic data
const mockGetQuestion = require("./data/getQuestionMock.json");
const mockGetQCQuestion = require("./data/getQCQuestions.json");

// Register a standard test wire adapter.
const currentPageReferenceAdapter = registerTestWireAdapter(getQuestion);

// mocking imperative call to getQCQuestions apex method for child component
jest.mock(
  "@salesforce/apex/QCQuestionExportApexController.getQCQuestions",
  () => {
    return {
      default: jest.fn()
    };
  },
  { virtual: true }
);

/*
    Created By: William Rembish
    date: 
    test coverage: %
*/

describe("c-lwc-q-c-question-edit", () => {
  // after each test, reset the DOM
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  // declare the element variable
  let element;

  // before each test, set element to be an instance of the LwcQCQuestionEdit component
  beforeEach(() => {
    element = createElement("c-lwc-q-c-question-edit", {
      is: LwcQCQuestionEdit
    });
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  it("Test ", async () => {
    // Emit data from @wire
    currentPageReferenceAdapter.emit(mockGetQuestion);

    // Assign mock value for resolved Apex promise for child component
    getQCQuestions.mockResolvedValue(mockGetQCQuestion);

    document.body.appendChild(element);

    // wait for all of the promises to resolve before continuing
    await flushPromises();

    // test public variables of the js file
    debugger
    expect(element.recordApi).toBeUndefined();
  });
});
