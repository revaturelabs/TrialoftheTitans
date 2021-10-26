/*
 * lwcQuestionTable Jest Testing
 * Author: Wayne He
 * Last modified: 10/26/2021
 * Code coverage: 85%
 */

import { createElement } from "lwc";
import LwcQuestionTable from "c/lwcQuestionTable";

const mockQuestions = require("./data/getQues.json");
const mockPool = require("./data/getPool.json");

import { registerApexTestWireAdapter } from "@salesforce/sfdx-lwc-jest";
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
  var element, examInput, dataTable, poolSelection, addToPoolButton;

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

  /*
   * Helper function to search questions and bind elements to global variables.
   */
  async function searchAndBind(searchTerms = "") {
    examInput = element.shadowRoot.querySelector("lightning-input");
    examInput.dispatchEvent(
      new CustomEvent("change", {
        detail: examInput
      })
    );

    //Get pools from wire method.
    getPoolAdapter.emit(mockPool);

    await flushPromises();

    dataTable = element.shadowRoot.querySelector("lightning-datatable");
    poolSelection = element.shadowRoot.querySelector(
      "lightning-checkbox-group"
    );
    const buttons = element.shadowRoot.querySelectorAll("lightning-button");
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].label == "Add questions to Pools") {
        addToPoolButton = buttons[i];
        break;
      }
    }
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

    await searchAndBind();

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

  it("Add questions to Pool", async () => {
    document.body.appendChild(element);

    await searchAndBind();

    //Attempt to click button with no pools selected.
    addToPoolButton.click();
    await flushPromises();

    //Add 0 questions to pool.
    poolSelection.value = [poolSelection.options[0]];
    poolSelection.dispatchEvent(
      new CustomEvent("change", {
        detail: poolSelection
      })
    );
    await flushPromises();
    addToPoolButton.click();
    await flushPromises();

    //Add some questions to the pool.
    dataTable.selectedRows = [
      mockQuestions[0].ques[0],
      mockQuestions[mockQuestions.length - 1].ques[0]
    ];
    dataTable.dispatchEvent(
      new CustomEvent("rowselection", {
        target: dataTable
      })
    );
    await flushPromises();
    addToPoolButton.click();
    await flushPromises();
    var selectedQuestions = dataTable.getSelectedRows();
    console.log(selectedQuestions);
    debugger;
    expect(selectedQuestions[0].Name).toBe(mockQuestions[0].ques[0].Name);
  });

  it("Change pages", async () => {
    document.body.appendChild(element);

    await searchAndBind();

    const buttons = element.shadowRoot.querySelectorAll("lightning-button");
    var prevButton, nextButton;
    for (var i = 0; i < buttons.length; i++) {
      switch (buttons[i].label) {
        case "Prev":
          prevButton = buttons[i];
          break;
        case "Next":
          nextButton = buttons[i];
          break;
      }
    }

    //Attempt to click on button when at first page.
    prevButton.click();
    await flushPromises();
    expect(element.pageNumber).toBe(0);

    //Attempt to click on next button.
    nextButton.click();
    await flushPromises();
    expect(element.pageNumber).toBe(1);
  });

  it("Change page size", async () => {
    document.body.appendChild(element);

    await searchAndBind();

    const pageSizeSelector = element.shadowRoot.querySelector("select");
    const pageSizeOptions = element.shadowRoot.querySelectorAll("option");
    pageSizeSelector.value = pageSizeOptions[1].value;
    pageSizeSelector.dispatchEvent(
      new CustomEvent("change", {
        target: pageSizeSelector
      })
    );
    await flushPromises();
    expect(element.pageSize).toBe("20");
  });
});
