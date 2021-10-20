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
    });

    it('Test to see if start is active component on init', () => { 
        document.body.appendChild(element);
        let active = element.shadowRoot.querySelector(".active");
    });


    it('Test connectedCallback', async () => {

        // append the element to the DOM
        document.body.appendChild(element);
    });


});