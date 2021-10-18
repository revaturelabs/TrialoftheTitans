import { createElement } from "lwc";
import LwcExamsLanding from "c/lwcExamsLanding";
import { registerApexTestWireAdapter } from "@salesforce/wire-service-jest-util";
import getExams from "@salesforce/apex/TitanPageApexController.getExams";

const TITAN = require("./data/titan.json");
const EXAMS = require("./data/exams.json");

const getExamsAdapter = registerApexTestWireAdapter(getExams);

describe("c-lwc-exams-landing", () => {
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
    const NAME = "Titan Exams";
    const element = createElement("c-lwc-exams-landing", {
      is: LwcExamsLanding
    });

    element.activetitan = TITAN;

    document.body.appendChild(element);

    const cardEl = element.shadowRoot.querySelector("lightning-card");

    expect(cardEl.title).toBe(NAME);
  });

  it("shows message when no data", () => {
    const MESSAGE = "No exams associated with Titan";
    const element = createElement("c-lwc-exams-landing", {
      is: LwcExamsLanding
    });

    document.body.appendChild(element);

    const divEl = element.shadowRoot.querySelector("div");

    expect(divEl.textContent).toBe(MESSAGE);
  });

  it("renders exam data", async () => {
    const element = createElement("c-lwc-exams-landing", {
      is: LwcExamsLanding
    });

    document.body.appendChild(element);

    getExamsAdapter.emit(EXAMS);

    await flushPromises();

    const pEls = element.shadowRoot.querySelectorAll("p");
    expect(pEls.lenght).toBe(2);
  });
});
