// John Glennan 10/22/2021 3:00pm

import { createElement } from "lwc";
import LwcHeroResults from "c/lwcHeroResults";
import getHeroResults from "@salesforce/apex/HeroAnswerResults.getHeroResults";

// need this for version 49 of sfdx-project.json version to be able to emit mock
import { registerApexTestWireAdapter } from "@salesforce/sfdx-lwc-jest";

// Realistic data with a list of contacts
const mockGetHeroResults = require("./data/getResults.json");
const getDataAdapter = registerApexTestWireAdapter(getHeroResults);

// Mock Apex wire adapter
jest.mock(
  "@salesforce/apex/HeroAnswerResults.getHeroResults",
  () => {
    const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest");
    return {
      default: createApexTestWireAdapter(jest.fn())
    };
  },
  { virtual: true }
);

describe("c-lwc-hero-results", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    // Prevent data saved on mocks from leaking between tests
    jest.clearAllMocks();
  });

  // Helper function to wait until the microtask queue is empty. This is needed for promise
  // timing when calling imperative Apex.
  async function flushPromises() {
    return Promise.resolve();
  }

  describe("getHeroResults @wire data (positive bulk)", () => {
    it("renders results on the page", async () => {
      // Create initial element
      const element = createElement("c-lwc-hero-results", {
        is: LwcHeroResults
      });

      // render the element on the shadow dom
      document.body.appendChild(element);

      // Setup
      // element.resultsId = 'a091F00000BK2jYQAT'

      // emit data @wire
      getDataAdapter.emit(mockGetHeroResults);

      // Wait for any asynchronous DOM updates
      await flushPromises();

      let nodeList =
        element.shadowRoot.querySelectorAll(".single-question").length;

      // Validate parameters of @wire

      expect(nodeList).toEqual(41);
    });

    it("shows error element when returned (negative test)", async () => {
      const element = createElement("c-lwc-hero-results", {
        is: LwcHeroResults
      });
      document.body.append(element);

      // throw an error
      getDataAdapter.error();

      //wait for async await
      await flushPromises();

      //grabbing nodes (should be empty)
      let nodeList =
        element.shadowRoot.querySelectorAll(".single-question").length;
      debugger;
      expect(nodeList).toEqual(0);
    });
  });
});
