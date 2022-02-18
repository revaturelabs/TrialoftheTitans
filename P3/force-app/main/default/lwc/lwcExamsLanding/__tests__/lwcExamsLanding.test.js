import { createElement } from "lwc";
import LwcExamsLanding from "c/lwcExamsLanding";
import { registerApexTestWireAdapter } from "@salesforce/wire-service-jest-util";
import getExams from "@salesforce/apex/TitanPageApexController.getExams";

const TITAN = require("./data/titan.json");
const EXAMS = require("./data/exams.json");

const getExamsAdapter = registerApexTestWireAdapter(getExams);

describe("c-lwc-exams-landing", () => {

  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

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
    const MPG = 'Minimum Passing Grade: ';
    const element = createElement("c-lwc-exams-landing", {
      is: LwcExamsLanding
    });

    document.body.appendChild(element);

    getExamsAdapter.emit(EXAMS);

    await Promise.resolve();

    const pEls = element.shadowRoot.querySelectorAll("p");
    expect(pEls.length).toBe(4);
    expect(pEls[0].textContent).toBe(EXAMS[0].Name);
    expect(pEls[1].textContent).toBe(MPG + EXAMS[0].Default_Passing_Grade__c);
    expect(pEls[2].textContent).toBe(EXAMS[1].Name);
    expect(pEls[3].textContent).toBe(MPG + EXAMS[1].Default_Passing_Grade__c);
  });
});
