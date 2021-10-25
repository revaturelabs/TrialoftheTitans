import { createElement } from "lwc";
import LwcLandingSkills from "c/lwcLandingSkills";
import { registerApexTestWireAdapter } from "@salesforce/wire-service-jest-util";
import getSkills from "@salesforce/apex/TitanPageApexController.getSkills";

const TITAN = require("./data/titan.json");
const SKILLS = require("./data/skills.json");

const getSkillsAdapter = registerApexTestWireAdapter(getSkills);

describe("c-lwc-landing-skills", () => {

  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("renders titan name", () => {
    const TITLE = "Titan Skills";
    const element = createElement("c-lwc-landing-skills", {
      is: LwcLandingSkills
    });

    // assign data to public property
    element.activetitan = TITAN;

    document.body.appendChild(element);

    // assert card title is the expected title
    const cardEl = element.shadowRoot.querySelector("lightning-card");
    expect(cardEl.title).toBe(TITLE);
  });

  it("shows message when no data", () => {
    const MESSAGE = "No skills associated with Titan";
    const element = createElement("c-lwc-landing-skills", {
      is: LwcLandingSkills
    });

    document.body.appendChild(element);

    // assert proper message when no data
    const divEl = element.shadowRoot.querySelector("div");
    expect(divEl.textContent).toBe(MESSAGE);
  });

  it("renders skill data", async () => {
    const element = createElement("c-lwc-landing-skills", {
      is: LwcLandingSkills
    });

    document.body.appendChild(element);

    getSkillsAdapter.emit(SKILLS);

    // await for dom to update
    await Promise.resolve();

    // assert content is listed and displayed correctly
    const pEls = element.shadowRoot.querySelectorAll("p");
    expect(pEls.length).toBe(2);
    expect(pEls[0].textContent).toBe(SKILLS[0].Name);
    expect(pEls[1].textContent).toBe(SKILLS[1].Name);
  });
});
