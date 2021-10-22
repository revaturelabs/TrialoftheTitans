import { createElement } from "lwc";
import LwcCohortStatistics from "c/lwcCohortStatistics";
import getData from "@salesforce/apex/QCHubController.getData";

const getDataMock = require("./data/getData.json");

/*
    Created By: William Rembish
    date: 
    test coverage: %
*/

jest.mock(
    "@salesforce/apex/QCHubController.getData",
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

describe("c-lwc-cohort-statistics", () => {
  // after each test, reset the DOM
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    jest.clearAllMocks();
  });

  // declare the element variable
  let element;

  // before each test, set element to be an instance of the lwcCohortStatistics component
  beforeEach(() => {
    element = createElement("c-lwc-cohort-statistics", {
      is: LwcCohortStatistics
    });
  });

  // Helper function to wait until the microtask queue is empty. This is needed for promise
  // timing when calling imperative Apex.
  async function flushPromises() {
    return Promise.resolve();
  }

  it("Test ", () => {

    const handler = getData.mockResolvedValue(getDataMock);

    // append the element to the DOM
    document.body.appendChild(element);

    const button = element.shadowRoot.querySelector("lightning-button");
    button.click();

    expect(handler).toHaveBeenCalled();
  });

  it("Test when the apex method throws an error", () => {

    // mock an error from the apex method
    getData.mockRejectedValue(APEX_ERROR);

    // append the element to the DOM
    document.body.appendChild(element);

    // make sure the ActiveCohort is undefined
    expect(element.ActiveCohort).toBeUndefined();
  });
});
