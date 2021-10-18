import { createElement } from "lwc";
import LwcLandingSkills from "c/lwcLandingSkills";
import getSkills from "@salesforce/apex/TitanPageApexController.getSkills";

const TITAN = require("./data/titan.json");
const SKILLS = require("./data/skills.json");

jest.mock(
  "@salesforce/apex/TitanPageApexController.getSkills",
  () => {
    const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest");
    return {
      default: createApexTestWireAdapter(jest.fn())
    };
  },
  { virtual: true }
);

describe("c-lwc-landing-skills", () => {
  beforeAll(() => {
    // We use fake timers as setTimeout is used in the JavaScript file.
    jest.useFakeTimers();
  });

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

  it("renders titan name", () => {
    const NAME = "Titan Skills";
    const element = createElement("c-lwc-landing-skills", {
      is: LwcLandingSkills
    });

    element.activetitan = TITAN;

    document.body.appendChild(element);

    const cardEl = element.shadowRoot.querySelector("lightning-card");

    expect(cardEl.title).toBe(NAME);
  });

  it("should be 1", () => {
    expect(1).toBe(1);
  });
});
