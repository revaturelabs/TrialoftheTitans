import { createElement } from 'lwc';
import LwcQuestionExport from 'c/lwcQuestionExport';
import getQCQuestions from '@salesforce/apex/QCQuestionExportApexController.getQCQuestions';

const mockGetQCQuestion = require('./data/getQCQuestions.json');

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
        expect(element.questionList).toStrictEqual([{Name: 'Hello', Question_Body__c: 'World', Id: 'a0KJ000000JaLP4MAN'}, {Name: 'Test', Question_Body__c: 'Test Question', Id: 'a0KJ000000JaLTwMAN'}]);
    });
});