import { createElement } from 'lwc';
import LwcQuestionExport from 'c/lwcQuestionExport';
import getQCQuestions from '@salesforce/apex/QCQuestionExportApexController.getQCQuestions';

const mockGetQCQuestion = require('./data/getQCQuestions.json');
const mockGetQCQuestionNoReturns = require('./data/getQCQuestionsNoReturn.json');

// mocking imperative call to getQCQuestions apex method
jest.mock(
    '@salesforce/apex/QCQuestionExportApexController.getQCQuestions',
    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

/*
    Created By: William Rembish
    date: 10/17/2021
    test coverage: 93.75%
*/
describe('c-lwc-question-export', () => {
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
    element = createElement('c-lwc-question-export', {
        is: LwcQuestionExport
    });
  });

    // Helper function to wait until the microtask queue is empty. This is needed for promise
    // timing when calling imperative Apex.
    async function flushPromises() {
        return Promise.resolve();
    }

    it('Test connectedCallback', async () => {

        // Assign mock value for resolved Apex promise
        getQCQuestions.mockResolvedValue(mockGetQCQuestion);

        // append the element to the DOM
        document.body.appendChild(element);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // test to make sure the connected callback function properly calls the apex method and assigns the values to the questionList variable
        expect(element.questionList).toStrictEqual([{Name: 'Hello', Question_Body__c: 'World', Id: 'a0KJ000000JaLP4MAN'}, {Name: 'Test', Question_Body__c: 'Test Question', Id: 'a0KJ000000JaLTwMAN'}]);
    });

    it('Test button press on no records returned', async () => {
        // creates a jest spy to check if something is console logged
        const consoleSpy = jest.spyOn(console, 'log');

        // Assign mock value for resolved Apex promise
        getQCQuestions.mockResolvedValue(mockGetQCQuestionNoReturns);

        // append the element to the DOM with no returns
        document.body.appendChild(element);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // make sure that the questionList is empty
        expect(element.questionList).toStrictEqual([]);

        // simulate onclick for the button to download the csv
        const button = element.shadowRoot.querySelector("lightning-button");
        button.click();

        // test to make sure that the console logs that there were no values to download in the csv
        expect(consoleSpy).toHaveBeenCalledWith('No values in the csv');
    });

    it('Test button press on records returned', async () => {
        // create a jest spy to check if the download link is created
        const createElementSpy = jest.spyOn(document, 'createElement');

        // Assign mock value for resolved Apex promise
        getQCQuestions.mockResolvedValue(mockGetQCQuestion);

        // append the element to the DOM
        document.body.appendChild(element);

        // Wait for any asynchronous DOM updates
        await flushPromises();

        // test to make sure the connected callback function properly calls the apex method and assigns the values to the questionList variable
        expect(element.questionList).toStrictEqual([{Name: 'Hello', Question_Body__c: 'World', Id: 'a0KJ000000JaLP4MAN'}, {Name: 'Test', Question_Body__c: 'Test Question', Id: 'a0KJ000000JaLTwMAN'}]);

        const button = element.shadowRoot.querySelector("lightning-button");
        button.click();

        expect(createElementSpy).toHaveBeenCalledWith("a");
    });
});