import { createElement } from "lwc";
import LwcExamInterview from "c/lwcExamInterview";
import { registerTestWireAdapter } from "@salesforce/sfdx-lwc-jest";
import examFinder from "@salesforce/apex/ExamInterviewApexController.examFinder";
import submitAnswers from "@salesforce/apex/ExamInterviewApexController.submitAnswers";
import submitExam from "@salesforce/apex/ExamInterviewApexController.submitExam";

/*
    Created By: William Rembish
    date: 10/25/2021
    test coverage: 96.87%
*/

// require the json for the examFinder mock implementation
const mockExamFinder = require("./data/examFinder.json");

// boolean to determine whether or not the loadScript will mock failure or success
let mockScriptSuccess = true;

// mock for loadScript
jest.mock(
  "lightning/platformResourceLoader",
  () => {
    return {
      loadScript() {
        return new Promise((resolve, reject) => {
          // If the variable is false we're simulating an error when loading
          // the script resource.
          if (!mockScriptSuccess) {
            reject("Could not load script");
          } else {
            global.moment = require("../../../staticresources/confetti.js");
            resolve();
          }
        });
      }
    };
  },
  { virtual: true }
);

// mock @wire for examFinder
const mockExamFinderWire = registerTestWireAdapter(examFinder);

// mock for imperative call to Apex method submitAnswers
jest.mock(
  "@salesforce/apex/ExamInterviewApexController.submitAnswers",
  () => {
    return {
      default: jest.fn()
    };
  },
  { virtual: true }
);

// mock for imperative call to Apex method submitExam
jest.mock(
  "@salesforce/apex/ExamInterviewApexController.submitExam",
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
  statusText: "Bad Request",
  message: "BAD"
};

describe("c-lwc-exam-interview", () => {
  // after each test, reset the DOM
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    // clear any mocks that have been performed
    jest.clearAllMocks();
  });

  // declare the element variable
  let element;

  // before each test, set element to be an instance of the LwcExamInterview component
  beforeEach(() => {
    element = createElement("c-lwc-exam-interview", {
      is: LwcExamInterview
    });
  });

  // function that makes the test wait until all promises resolve
  async function flushPromises() {
    return Promise.resolve();
  }

  it("Test successful component functionality", async () => {
    // set the examId and accId for the component as if passed by parent
    element.examId = "a0A1700000G0szsEAB";
    element.accId = "0011700001PRbtRAAT";
    // mock the wire function on the element
    mockExamFinderWire.emit({ error: null, data: mockExamFinder });
    // mock submitAnswers as a successful call
    submitAnswers.mockResolvedValue(true);
    // mock submitExam as a successful call
    submitExam.mockResolvedValue(true);

    // append element to the DOM
    document.body.appendChild(element);

    // wait for any promises to resolve
    await flushPromises();

    // expect the celebrate button to not be defined yet
    expect(element.shadowRoot.querySelector(".celebrate")).toBeFalsy();
    // expect the previous button to be disabled
    expect(element.shadowRoot.querySelector(".prev").disabled).toBeTruthy();

    // mock onanswerupdated event from the child component
    const childCompQues = element.shadowRoot.querySelector("c-lwc-question");
    childCompQues.dispatchEvent(
      new CustomEvent("answerupdated", {
        detail: "option 1"
      })
    );

    // wait for any promises to resolve
    await flushPromises();

    // mock onclick for the next button
    const nextButton = element.shadowRoot.querySelector(".next");
    nextButton.click();

    // wait for any promises to resolve
    await flushPromises();

    // mock onclick for the previous button
    const prevButton = element.shadowRoot.querySelector(".prev");
    // expect that the prevButton will no longer be disabled
    expect(prevButton.disabled).toBeFalsy();
    prevButton.click();

    // wait for any promises to resolve
    await flushPromises();
    // expect that the prevButton will be disabled again
    expect(prevButton.disabled).toBeTruthy();

    // mock onconfirmationclick event from the child component
    const childCompModal = element.shadowRoot.querySelector("c-lwc-slds-modal");
    childCompModal.dispatchEvent(new CustomEvent("confirmationclick"));

    // wait for any promises to resolve
    await flushPromises();
    // expect the celebrate button to be rendered
    expect(element.shadowRoot.querySelector(".celebrate")).toBeTruthy();

    // mock onclick for the celebrate button
    const celebrateButton = element.shadowRoot.querySelector(".celebrate");
    celebrateButton.click();

    // wait for any promises to resolve
    await flushPromises();
  });

  it("Test if the wire returns an error", async () => {
    // create a spy to see if console.log is called
    const consoleSpy = jest.spyOn(console, "log");
    // give the component an examId and accId it needs
    element.examId = "a0A1700000G0szsEAB";
    element.accId = "0011700001PRbtRAAT";
    // mock if there is an error returned from the @wire for examFinder
    mockExamFinderWire.emit({ error: true, data: null });

    // append element to the DOM
    document.body.appendChild(element);

    // wait for all promises to resolve
    await flushPromises();

    // make sure that console.log was called with the error value I passed in the mock @wire
    expect(consoleSpy).toHaveBeenCalledWith(true);

    // grab the span that is rendered if an error is thrown and test to make sure it says 'error'
    const span = element.shadowRoot.querySelector("span");
    expect(span.textContent).toBe("error");

    // grab the h2 that is rendered if an error is thrown and test to make sure it displays the correct thing
    const header2 = element.shadowRoot.querySelector("h2");
    expect(header2.textContent).toBe("Application Error:");
  });

  it("Test if sumbitAnswers returns an error", async () => {
    // create a spy to see if console.log is called
    const consoleLogSpy = jest.spyOn(console, "log");
    // create a spy to see if console.error is called
    const consoleErrorSpy = jest.spyOn(console, "error");
    // set the examId and accId for the component
    element.examId = "a0A1700000G0szsEAB";
    element.accId = "0011700001PRbtRAAT";
    // mock the wire function on the element
    mockExamFinderWire.emit({ error: null, data: mockExamFinder });
    // mock a success for submitExam call
    submitExam.mockResolvedValue(true);
    // mock an error for submitAnswers
    submitAnswers.mockRejectedValue(APEX_ERROR);

    // append the element to the DOM
    document.body.appendChild(element);

    // wait for any promises to resolve
    await flushPromises();

    // mock onconfirmationclick event from the child component
    const childCompModal = element.shadowRoot.querySelector("c-lwc-slds-modal");
    childCompModal.dispatchEvent(new CustomEvent("confirmationclick"));

    // wait for any promises to resolve
    await flushPromises();

    // expect the console.log to have been called with the toast message
    expect(consoleLogSpy).toHaveBeenCalledWith(mockExamFinder);

    // check to make sure console.error was called the expected ways
    expect(consoleErrorSpy).toHaveBeenCalledWith("BAD");
    expect(consoleErrorSpy).toHaveBeenLastCalledWith("e.stack => undefined");
    expect(consoleErrorSpy).toHaveBeenCalledTimes(5);
  });

  it("Test if submitExam returns an error", async () => {
    // create a spy to see if console.log is called
    const consoleLogSpy = jest.spyOn(console, "log");
    // set the examId and accId for the component
    element.examId = "a0A1700000G0szsEAB";
    element.accId = "0011700001PRbtRAAT";
    // mock the wire function on the element
    mockExamFinderWire.emit({ error: null, data: mockExamFinder });
    // mock an error for the submitExam method call
    submitExam.mockRejectedValue(APEX_ERROR);

    // append the element to the DOM
    document.body.appendChild(element);

    // wait for any promises to resolve
    await flushPromises();

    // mock onconfirmationclick event from the child component
    const childCompModal = element.shadowRoot.querySelector("c-lwc-slds-modal");
    childCompModal.dispatchEvent(new CustomEvent("confirmationclick"));

    // wait for any promises to resolve
    await flushPromises();

    // expect the console.log to have been called with the toast message
    expect(consoleLogSpy).toHaveBeenCalledWith(mockExamFinder);
  });

  it("Test to see if the script for confetti fails to load", async () => {
    // create a spy to see if console.log is called
    const consoleLogSpy = jest.spyOn(console, "log");
    // set the examId and accId for the component
    element.examId = "a0A1700000G0szsEAB";
    element.accId = "0011700001PRbtRAAT";
    // mock the wire function on the element
    mockExamFinderWire.emit({ error: null, data: mockExamFinder });
    // mock successful submitAnswers method call
    submitAnswers.mockResolvedValue(true);
    // mock successful submitExam method call
    submitExam.mockResolvedValue(true);
    // set the global mockScriptSuccess to false to mock a failure to load script
    mockScriptSuccess = false;

    // append element to the DOM
    document.body.appendChild(element);

    // wait for any promises to resolve
    await flushPromises();

    // expect the console.log to have been called with 'Could not load script' error
    expect(consoleLogSpy).toHaveBeenCalledWith("Could not load script");
  });
});
