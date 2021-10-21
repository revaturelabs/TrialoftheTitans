import { createElement } from "lwc";
import LwcQCQuestionEdit from "c/lwcQCQuestionEdit";
import getQuestion from "@salesforce/apex/QCQuestionEditController.getQuestion";
import { registerTestWireAdapter } from "@salesforce/sfdx-lwc-jest";
import getQCQuestions from "@salesforce/apex/QCQuestionExportApexController.getQCQuestions";
import deleteQuestions from "@salesforce/apex/QCQuestionEditController.deleteQuestions";
import { updateRecord } from "lightning/uiRecordApi";

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

// mocking imperative call to getQuestion apex method for this component
jest.mock(
  "@salesforce/apex/QCQuestionEditController.getQuestion",
  () => {
    return {
      default: jest.fn()
    };
  },
  { virtual: true }
);

// mocking imperative call to deleteQuestions apex method for this component
jest.mock(
  "@salesforce/apex/QCQuestionEditController.deleteQuestions",
  () => {
    return {
      default: jest.fn()
    };
  },
  { virtual: true }
);

// mocking imperative call to the uiRecordApi updateRecord method
jest.mock(
  "lightning/uiRecordApi.updateRecord",
  () => {
    return {
      default: jest.fn()
    };
  },
  { virtual: true }
);



// Sample error for imperative Apex call
const APEX_ERROR = {
  body: { message: "An internal server error has occurred" },
  ok: false,
  status: 400,
  statusText: "Bad Request"
};

/*
    Created By: William Rembish
    date: 10/21/2021
    test coverage: 100%
*/

describe("c-lwc-q-c-question-edit", () => {
  // after each test, reset the DOM
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    jest.clearAllMocks();
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

  it("Test initialization of the component", async () => {
    // Emit data from @wire
    currentPageReferenceAdapter.emit({ data: mockGetQuestion, error: null });

    // Assign mock value for resolved Apex promise for child component
    getQCQuestions.mockResolvedValue(mockGetQCQuestion);

    // Assign mock value for resolved Apex promise from this component
    getQuestion.mockResolvedValue(mockGetQuestion);

    // append the element to the DOM
    document.body.appendChild(element);

    // wait for all of the promises to resolve before continuing
    await flushPromises();

    // make sure that the lightning-datatable is rendered and the paragraph for errors is not
    expect(
      element.shadowRoot.querySelector("lightning-datatable")
    ).not.toBeFalsy();
    expect(element.shadowRoot.querySelector("p")).toBeFalsy();
  });

  it("Test if the wire resolves with an error", async () => {
    // Emit data from @wire
    currentPageReferenceAdapter.emit({ data: null, error: true });

    // Assign mock value for resolved Apex promise for child component
    getQCQuestions.mockResolvedValue(mockGetQCQuestion);

    // Assign mock value for resolved Apex promise from this component
    getQuestion.mockResolvedValue(mockGetQuestion);

    // append the element to the DOM
    document.body.appendChild(element);

    // wait for all of the promises to resolve before continuing
    await flushPromises();

    // make sure that when an error is returned by the wire, the lighnting-datatable is not rendered but the error paragraph is
    expect(element.shadowRoot.querySelector("lightning-datatable")).toBeNull();
    expect(element.shadowRoot.querySelector("p")).not.toBeFalsy();
    expect(element.shadowRoot.querySelector("p").textContent).toBe("error no query");
  });

  it("Test if an error is thrown in the imperative apex call of getQuestion()", async () => {
    // Emit data from @wire
    currentPageReferenceAdapter.emit({ data: mockGetQuestion, error: null });

    // Assign mock value for resolved Apex promise for child component
    getQCQuestions.mockResolvedValue(mockGetQCQuestion);

    // Assign mock value for rejected value for getQuestion apex method
    const handler = getQuestion.mockRejectedValue(APEX_ERROR);

    // append the element to the DOM
    document.body.appendChild(element);

    // wait for all of the promises to resolve before continuing
    await flushPromises();

    // check that the element didn't break when an error was thrown
    expect(element).not.toBeFalsy();
    expect(element.shadowRoot.querySelector("lightning-datatable").data).toBeFalsy();
  });

  it("Test successful save of edits", async () => {
    // Emit data from @wire
    currentPageReferenceAdapter.emit({ data: mockGetQuestion, error: null });

    // Assign mock value for resolved Apex promise for child component
    getQCQuestions.mockResolvedValue(mockGetQCQuestion);

    // Assign mock value for resolved Apex promise from this component
    const handler = getQuestion.mockResolvedValue(mockGetQuestion);

    updateRecord.mockResolvedValue(mockGetQuestion[0]);

    // append the element to the DOM
    document.body.appendChild(element);

    // wait for all of the promises to resolve before continuing
    await flushPromises();

    // dispatch the save event on the lightning-datatable and ensure it succeeds properly
    const datatable = element.shadowRoot.querySelector("lightning-datatable");
    datatable.dispatchEvent(
      new CustomEvent("save", {
        detail: {
          draftValues: [
            {
              Question_Body__c: "The questions",
              Id: "a0KJ000000JaQ6XMAV"
            }
          ]
        }
      })
    );
    await flushPromises();

      expect(handler).toHaveBeenCalled();
  });

  it("Test failed save of edits", async () => {
    // Emit data from @wire
    currentPageReferenceAdapter.emit({ data: mockGetQuestion, error: null });

    // Assign mock value for resolved Apex promise for child component
    getQCQuestions.mockResolvedValue(mockGetQCQuestion);

    // Assign mock value for resolved Apex promise from this component
    const handler = getQuestion.mockResolvedValue(mockGetQuestion);

    updateRecord.mockRejectedValue(APEX_ERROR);

    // append the element to the DOM
    document.body.appendChild(element);

    // wait for all of the promises to resolve before continuing
    await flushPromises();

    // dispatch the save event on the lightning-datatable and ensure if it throws an error its handled properly
    const datatable = element.shadowRoot.querySelector("lightning-datatable");
    datatable.dispatchEvent(
      new CustomEvent("save", {
        detail: {
          draftValues: [
            {
              Question_Body__c: "The questions",
              Id: "a0KJ000000JaQ6XMAV"
            }
          ]
        }
      })
    );
    await flushPromises();

    expect(handler).toHaveBeenCalled();
  });

  it("Test that deleting a row with the onrowaction delete action works as expected", async () => {
    // Emit data from @wire
    currentPageReferenceAdapter.emit({ data: mockGetQuestion, error: null });

    // Assign mock value for resolved Apex promise for child component
    getQCQuestions.mockResolvedValue(mockGetQCQuestion);

    // Assign mock value for resolved Apex promise from this component
    const handler = getQuestion.mockResolvedValue(mockGetQuestion);

    deleteQuestions.mockResolvedValue(null);

    // append the element to the DOM
    document.body.appendChild(element);

    // wait for all of the promises to resolve before continuing
    await flushPromises();

    // dispatch the rowaction event on the lightning-datatable with the delete action selected
    // and ensure it performs as expected
    const datatable = element.shadowRoot.querySelector("lightning-datatable");
    datatable.dispatchEvent(
      new CustomEvent("rowaction", {
        detail: {
          row: {
            Id: "a0KJ000000JaQ4yMAF",
            Name: "Question1",
            Question_Body__c: "The questions"
          },
          action: {
            label: "delete",
            name: "delete"
          }
        }
      })
    );

    await flushPromises();

    expect(handler).toHaveBeenCalled();
  });

  it("Test that an error in the delete action in the onrowaction is handled as expected", async () => {
    // Emit data from @wire
    currentPageReferenceAdapter.emit({ data: mockGetQuestion, error: null });

    // Assign mock value for resolved Apex promise for child component
    getQCQuestions.mockResolvedValue(mockGetQCQuestion);

    // Assign mock value for resolved Apex promise from this component
    const handler = getQuestion.mockResolvedValue(mockGetQuestion);

    deleteQuestions.mockRejectedValue(APEX_ERROR);

    // append the element to the DOM
    document.body.appendChild(element);

    // wait for all of the promises to resolve before continuing
    await flushPromises();

    // dispatch the rowaction event with the delete action selected and ensure that it handles an error being thrown correctly
    const datatable = element.shadowRoot.querySelector("lightning-datatable");
    datatable.dispatchEvent(
      new CustomEvent("rowaction", {
        detail: {
          row: {
            Id: "a0KJ000000JaQ4yMAF",
            Name: "Question1",
            Question_Body__c: "The questions"
          },
          action: {
            label: "delete",
            name: "delete"
          }
        }
      })
    );

    await flushPromises();

    expect(handler).toHaveBeenCalled();
  });
});
