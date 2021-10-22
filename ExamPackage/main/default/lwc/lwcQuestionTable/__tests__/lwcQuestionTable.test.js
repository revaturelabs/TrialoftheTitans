/*
 * lwcQuestionTable Jest Testing
 * Author: Wayne He
 * Last modified: 10/22/2021
 * Code coverage: 49.36%
 */

import { createElement } from "lwc";
import LwcQuestionTable from "c/lwcQuestionTable";

const mockQuestions = require("./data/getQues.json");
const mockPool = require("./data/getPool.json");

import { registerApexTestWireAdapter } from "@salesforce/sfdx-lwc-jest";
import addQues2Pool from "@salesforce/apex/QuestionTableApexController.addQues2Pool";
import getPool from "@salesforce/apex/QuestionTableApexController.GetPool";
import getQues from "@salesforce/apex/QuestionTableApexController.GetQues";

/*
 * Mock functions for Jest testing.
 */
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

const getPoolAdapter = registerApexTestWireAdapter(getPool);
jest.mock(
  "@salesforce/apex/QuestionTableApexController.GetPool",
  () => {
    return {
      default: jest.fn()
    };
  },
  {
    virtual: true
  }
);

jest.mock(
  "@salesforce/apex/QuestionTableApexController.addQues2Pool",
  () => {
    return {
      default: jest.fn()
    };
  },
  {
    virtual: true
  }
);

/*
 * All tests go in here.
 */
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

  /*
   * Helper function that flushes promises
   */
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

  it("Search All Questions", async () => {
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
    expect(dataTable.data.length).toBe(mockQuestions.length);
    expect(dataTable.data[0].Name).toBe(mockQuestions[0].ques[0].Name);
  });

  it("Get Pool", async () => {
    document.body.appendChild(element);

    //Get data from wire method.
    getPoolAdapter.emit(mockPool);

    await flushPromises();

    const poolSelection = element.shadowRoot.querySelector(
      "lightning-checkbox-group"
    );
    expect(poolSelection.options.length).toBe(mockPool.length);
  });
});
