import { createElement } from 'lwc';
import LwcExamResultsPoolPage from 'c/LwcExamResultsPoolPage';

import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

import GetAllExamResultPoolQuestions from '@salesforce/apex/ExamResultsPoolPageAuraController.GetAllExamResultPoolQuestions';
import GetCorrectExamResultPoolQuestions from '@salesforce/apex/ExamResultsPoolPageAuraController.GetCorrectExamResultPoolQuestions';

const mockGetCorrectExamResultPoolQuestions = require('./data/correct.json');
const mockGetAllExamResultPoolQuestions = require('./data/questions.json');

const getCorrectListAdapter = registerApexTestWireAdapter(GetCorrectExamResultPoolQuestions);
const getAllListAdapter = registerApexTestWireAdapter(GetAllExamResultPoolQuestions);


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
        jest.clearAllMocks();
    });

    let element;

    beforeEach(() => {
        element = createElement('c--lwc-exam-results-pool-page', {
            is: LwcExamResultsPoolPage
        });
        document.body.appendChild(element);
        element.examResultId = "a090R00000DPqc6QAD";

    });

    async function flushPromises() {
        return Promise.resolve();
      }

    it('Test Correct array size from mock data wire', async () => {
        getCorrectListAdapter.emit(mockGetCorrectExamResultPoolQuestions);
        await flushPromises();
        expect(element.correctQuestions.length).toBe(2);
    });

    it('Test All array size from mock data wire', async () => {
        getAllListAdapter.emit(mockGetAllExamResultPoolQuestions);
        await flushPromises();
        expect(element.ExamResultPoolQuestions.length).toBe(4);
    });

    it('Test exam percentage off mock data wire executed in All then Correct order', async () => {
        getAllListAdapter.emit(mockGetAllExamResultPoolQuestions);
        getCorrectListAdapter.emit(mockGetCorrectExamResultPoolQuestions);
        await flushPromises();
        let text = element.shadowRoot.querySelector(".wrapper");
        let result = text.textContent.includes("50.00%");
        expect(result).toBe(true);
    });

    it('Test exam percentage off mock data executed in Correct then All order', async () => {
        getCorrectListAdapter.emit(mockGetCorrectExamResultPoolQuestions);
        getAllListAdapter.emit(mockGetAllExamResultPoolQuestions);
        await flushPromises();
        let text = element.shadowRoot.querySelector(".wrapper");
        let result = text.textContent.includes("50.00%");
        expect(result).toBe(true);
    });

    it('Test Page when both @wire returns errors', async () => {
        getAllListAdapter.error();
        getCorrectListAdapter.error();
        await flushPromises();
        let text = element.shadowRoot.querySelector("p");
        let result = text.textContent.includes("There are no exam results related to the exam's pool");
        expect(result).toBe(true);
    });

});