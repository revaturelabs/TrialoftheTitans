import { createElement } from "lwc";
import LwcQuestionTable from "c/lwcQuestionTable";

const mockQuestions = require("./data/getQues.json");
const mockPool = require("./data/getPool.json");

import addQues2Pool from "@salesforce/apex/QuestionTableApexController.addQues2Pool";
import getPool from "@salesforce/apex/QuestionTableApexController.GetPool";
import getQues from "@salesforce/apex/QuestionTableApexController.GetQues";

jest.mock(
  "@salesforce/apex/QuestionTableApexController.GetQues",
  () => {
    return {
      default: jest.fn()
    };
  },
  {
    virtual: true
  }
);

describe("c-lwc-question-table", () => {
  var element;

  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
  });

  beforeEach(() => {
    element = createElement("c-lwc-question-table", {
      is: LwcQuestionTable
    });
    getQues.mockResolvedValue(mockQuestions);
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  it("Initial load with tests predefined in input textbox", async () => {
    getQues.mockResolvedValue([]);
    document.body.appendChild(element);

    await flushPromises();

    const dataTable = element.shadowRoot.querySelector("lightning-datatable");
    expect(dataTable.data.length).toBe(0);
  });

  it("Search Questions", async () => {
    document.body.appendChild(element);

    const examInput = element.shadowRoot.querySelector("lightning-input");
    examInput.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          value: ""
        }
      })
    );

    await flushPromises();

    const dataTable = element.shadowRoot.querySelector("lightning-datatable");
    expect(dataTable.data.length).toBe(82);
    expect(dataTable.data[0].Name).toBe("Test0");
  });

  it("Add Questions to Pool", async () => {
    document.body.appendChild(element);

    const poolSelection = element.shadowRoot.querySelector(
      "lightning-checkbox-group"
    );
    const dataTable = element.shadowRoot.querySelector("lightning-datatable");
    const addToPoolButton =
      element.shadowRoot.querySelector("lightning-button");
  });
});
