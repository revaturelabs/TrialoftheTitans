import { createElement } from "lwc";
import LwcQCQuestionsImport from "c/lwcQCQuestionsImport";
import insertData from "@salesforce/apex/lwcCSVUploaderController.insertData";

/*
    Created By: William Rembish
    date: 10/18/2021
    test coverage: 93.54%
    couldn't figure out how to get the last couple of lines of code to run
*/

jest.mock(
  "@salesforce/apex/lwcCSVUploaderController.insertData",
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

describe("c-lwc-q-c-questions-import", () => {
  // after each test, reset the DOM
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  // declare the element variable
  let element;

  // before each test, set element to be an instance of the lwcQCQuestionImport component
  beforeEach(() => {
    element = createElement("c-lwc-q-c-questions-import", {
      is: LwcQCQuestionsImport
    });
  });

  // Helper function to wait until the microtask queue is empty. This is needed for promise
  // timing when calling imperative Apex.
  async function flushPromises() {
    return Promise.resolve();
  }

  it("Test default values for js variables ", () => {
    // append the element to the DOM
    document.body.appendChild(element);

    // check each variable from the js file with no inputs or events happening
    expect(element.showcard).toBeFalsy();
    expect(element.file).toBeUndefined();
    expect(element.lines).toBeUndefined();
    expect(element.getResults).toBeUndefined();
    expect(element.results).toBeUndefined();
    expect(element.content).toBeUndefined();
    expect(element.fileContents).toBeUndefined();
    expect(element.reader).toBeUndefined();
    expect(element.recordId).toBeUndefined();
    expect(element.error).toBeUndefined();
    expect(element.columnsQuestion).toBeUndefined();
    expect(element.uploadedFile).toStrictEqual([]);
  });

  it("Test lightning-input element", async () => {
    // append element to the DOM
    document.body.appendChild(element);

    // create a csv file to 'upload'
    const str =
      "Name,Question_Body__c,Expected_Answer__c\nHello,World,HelloWorld\nTest,TestQuestion,TestQuestion";
    const blob = new Blob([str]);
    const file = new File([blob], "mockExams.csv", { type: ".csv" });
    File.prototype.text = jest.fn().mockResolvedValueOnce(str);

    // select the lightning-input from the DOM
    const inputFile = element.shadowRoot.querySelector("lightning-input");

    // simulate uploading a file and the calling of the onchange event
    inputFile.files = [file];
    inputFile.dispatchEvent(new CustomEvent("change"));

    // wait for all promises to resolve
    await flushPromises();

    // test that the scv2Json function returns the expected value
    expect(element.csv2Json(str)).toBe(
      '[{"Name":"Hello","Question_Body__c":"World","Expected_Answer__c":"HelloWorld"},{"Name":"Test","Question_Body__c":"TestQuestion","Expected_Answer__c":"TestQuestion"}]'
    );
  });

  it("Test successful button click ", async () => {
    // set the getResults of the element to a value that would actually be set there
    element.getResults =
      '[{"Name":"Hello","Question_Body__c":"World","Expected_Answer__c":"HelloWorld"},{"Name":"Test","Question_Body__c":"TestQuestion","Expected_Answer__c":"TestQuestion"}]';
    // Passing mock value for successful Apex promise
    const handler = insertData.mockResolvedValue("success");

    // append element to the DOM
    document.body.appendChild(element);

    // simulate clicking the create records button
    const button = element.shadowRoot.querySelector("lightning-button");
    button.click();

    // wait for all promises to resolve
    await flushPromises();

    // expect that the mock function was called
    expect(handler).toHaveBeenCalled();
  });

  it("Test failure button click", async () => {
    // Passing mock value for rejected Apex promise
    const handler = insertData.mockRejectedValue(APEX_ERROR);

    element.getResults = "test failure";
    // append element to the DOM
    document.body.appendChild(element);

    // simulate clicking the create records button
    const button = element.shadowRoot.querySelector("lightning-button");
    button.click();

    // wait for all promises to resolve
    await flushPromises();

    // expect that the mock function was called
    expect(handler).toHaveBeenCalled();
  });
});
