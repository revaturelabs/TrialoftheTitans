import { createElement } from "lwc";
import LwcExamCreation from "c/lwcExamCreation";
import { createRecord } from "lightning/uiRecordApi";

/*
    Created By: William Rembish
    date: 10/17/2021
    test coverage: 93.75%
*/
const createRecordMock = require("./data/createRecord.json");

jest.mock(
  "lightning/uiRecordApi.createRecord",
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


describe("c-lwc-exam-creation", () => {
  // after each test, reset the DOM
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  // declare the element variable
  let element;

  // before each test, set element to be an instance of the lwcExamCreation component
  beforeEach(() => {
    element = createElement("c-lwc-exam-creation", {
      is: LwcExamCreation
    });
  });

  // Helper function to wait until the microtask queue is empty. This is needed for promise
  // timing when calling imperative Apex.
  async function flushPromises() {
    return Promise.resolve();
  }

  it("Test all of the default values for variables in the js file", () => {
    // append the element to the DOM
    document.body.appendChild(element);

    // test to make sure each element variable is the expected values
    expect(element.examObj).toStrictEqual({ objectApiName: "Exam__c" });
    expect(element.examId).toBeUndefined();
    expect(element.nameField).toStrictEqual({
      fieldApiName: "Name",
      objectApiName: "Exam__C"
    });
    expect(element.nextExamField).toStrictEqual({
      fieldApiName: "Next_Exam__c",
      objectApiName: "Exam__C"
    });
    expect(element.titanField).toStrictEqual({
      fieldApiName: "Titan__c",
      objectApiName: "Exam__C"
    });
    expect(element.dPGField).toStrictEqual({
      fieldApiName: "Default_Passing_Grade__c",
      objectApiName: "Exam__C"
    });
    expect(element.dTLField).toStrictEqual({
      fieldApiName: "Default_Time_Limit__c",
      objectApiName: "Exam__C"
    });
    expect(element.titan).toBeUndefined();
    expect(element.exam).toBeUndefined();
    expect(element.name).toBe("");
    expect(element.DPG).toBe(0);
    expect(element.DTL).toBe(0);
  });

  it("Test Name lightning-input onchange", () => {
    // append the element to the DOM
    document.body.appendChild(element);

    // make sure the correct lightning input is being selected to test on
    const inputName = Array.from(
      element.shadowRoot.querySelectorAll("lightning-input")
    )[0];
    expect(inputName.label).toBe("Name");

    // simulate an onchange event for the Name lightning-input
    inputName.value = "TestName";
    inputName.dispatchEvent(new CustomEvent("change"));

    // make sure the onchange handler performs as expected
    return Promise.resolve().then(() => {
      expect(element.examId).toBe(undefined);
      expect(element.name).toBe("TestName");
    });
  });

  it("Test Titan lightning-input onchange", () => {
    // append the element to the DOM
    document.body.appendChild(element);

    // make sure the correct lightning input is being selected to test on
    const inputTitan = Array.from(
      element.shadowRoot.querySelectorAll("lightning-input")
    )[1];
    expect(inputTitan.label).toBe("Titan");

    // simulate an onchange event for the Titan lightning-input
    inputTitan.value = "TestTitan";
    inputTitan.dispatchEvent(new CustomEvent("change"));

    // make sure the onchange handler performs as expected
    return Promise.resolve().then(() => {
      expect(element.titan).toBe("TestTitan");
    });
  });

  it("Test Next Exam lightning-input onchange", () => {
    // append the element to the DOM
    document.body.appendChild(element);

    // make sure the correct lightning input is being selected to test on
    const inputNextExam = Array.from(
      element.shadowRoot.querySelectorAll("lightning-input")
    )[2];
    expect(inputNextExam.label).toBe("Next Exam");

    // simulate an onchange event for the Next Exam lightning-input
    inputNextExam.value = "TestNextExam";
    inputNextExam.dispatchEvent(new CustomEvent("change"));

    // make sure the onchange handler performs as expected
    return Promise.resolve().then(() => {
      expect(element.exam).toBe("TestNextExam");
    });
  });

  it("Test Default Passing Grade lightning-input onchange", () => {
    // append the element to the DOM
    document.body.appendChild(element);

    // make sure the correct lightning input is being selected to test on
    const inputDPG = Array.from(
      element.shadowRoot.querySelectorAll("lightning-input")
    )[3];
    expect(inputDPG.label).toBe("Default Passing Grade");

    // simulate an onchange event for the Default Passing Grade lightning-input
    inputDPG.value = "TestDPG";
    inputDPG.dispatchEvent(new CustomEvent("change"));

    // make sure the onchange handler performs as expected
    return Promise.resolve().then(() => {
      expect(element.DPG).toBe("TestDPG");
    });
  });

  it("Test Default Time Limit lightning-input onchange", () => {
    // append the element to the DOM
    document.body.appendChild(element);

    // make sure the correct lightning input is being selected to test on
    const inputDTL = Array.from(
      element.shadowRoot.querySelectorAll("lightning-input")
    )[4];
    expect(inputDTL.label).toBe("Default Time Limit");

    // simulate an onchange event for the Default Time Limit lightning-input
    inputDTL.value = "TestDTL";
    inputDTL.dispatchEvent(new CustomEvent("change"));

    // make sure the onchange handler performs as expected
    return Promise.resolve().then(() => {
      expect(element.DTL).toBe("TestDTL");
    });
  });

  it("Test createRecord button on success", async () => {
    // set values for all the necessary variables to create an exam
    element.name = "TEST EXAM";
    element.DPG = 50;
    element.DTL = 5;
    // append the element to the DOM
    document.body.appendChild(element);

    const handler = createRecord.mockResolvedValue(createRecordMock);

    // ensure the button is propery being selected to test on
    const createExamButton =
      element.shadowRoot.querySelector("lightning-button");
    expect(createExamButton.label).toBe("Create Exam");

    // simulate an onclick event for the button
    createExamButton.dispatchEvent(new CustomEvent("click"));

    await flushPromises();

    expect(handler).toHaveBeenCalled();
  });

  it("Test createRecord button on failure", async () => {
    // set values for all the necessary variables to create an exam
    element.name = "TEST EXAM";
    element.DPG = 50;
    element.DTL = 5;
    // set an improper value for the titan field
    element.titan = "This will fail";

    const handler = createRecord.mockRejectedValue(APEX_ERROR);

    // append the element to the DOM
    document.body.appendChild(element);

    // ensure the button is propery being selected to test on
    const createExamButton =
      element.shadowRoot.querySelector("lightning-button");
    expect(createExamButton.label).toBe("Create Exam");

    // simulate an onclick event for the button
    createExamButton.dispatchEvent(new CustomEvent("click"));

    await flushPromises();

    expect(handler).toHaveBeenCalled();
  });
});
