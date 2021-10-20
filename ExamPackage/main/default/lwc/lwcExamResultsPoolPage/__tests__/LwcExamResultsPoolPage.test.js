import { createElement } from 'lwc';
import LwcExamResultsPoolPage from 'c/LwcExamResultsPoolPage';

import getQCQuestions from '@salesforce/apex/QCQuestionExportApexController.getQCQuestions';

const mockGetQCQuestion = require('./data/correct.json');
const mockGetQCQuestionNoReturns = require('./data/questions.json');



jest.mock(
    '@salesforce/apex/ExamResultsPoolPageAuraController.GetAllExamResultPoolQuestions',

    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

jest.mock(
    '@salesforce/apex/ExamResultsPoolPageAuraController.GetCorrectExamResultPoolQuestions',

    () => {
        return {
            default: jest.fn()
        };
    },
    { virtual: true }
);

describe('c--lwc-exam-results-pool-page', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    let element;

    beforeEach(() => {
        element = createElement('c-lwc-exam-results-pool-page', {
            is: LwcExamResultsPoolPage
        });
        document.body.appendChild(element);
    });

    it('Test to see if start is active component on init', () => { 
        let active = element.shadowRoot.querySelector(".active");
        expect(active.textContent).toBe("Start");
    });


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


});