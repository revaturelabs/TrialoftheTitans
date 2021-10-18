import { createElement } from 'lwc';
import LwcQCInterviewCohortSelection from 'c/lwcQCInterviewCohortSelection';

/*
    Created By: William Rembish
    date: 10/17/2021
    test coverage: 100%
*/
describe('c-lwc-q-c-interview-cohort-selection', () => {
    // after each test, reset the DOM
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // declare the element variable
    let element;

    // before each test, set element to be an instance of the lwcQCInterviewCohortSelection component
    beforeEach(() => {
        element = createElement('c-lwc-q-c-interview-cohort-selection', {
            is: LwcQCInterviewCohortSelection
        });
    });

    it('Test ', () => {
        
        // append the element to the DOM
        document.body.appendChild(element);

        // test to make sure that the columns variable is initialized correctly
        expect(element.columns).toBeUndefined();
    });
});