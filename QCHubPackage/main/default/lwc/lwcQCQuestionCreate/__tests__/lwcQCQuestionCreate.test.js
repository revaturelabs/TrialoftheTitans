import { createElement } from 'lwc';
import LwcQCQuestionCreate from 'c/lwcQCQuestionCreate';

/*
    Created By: William Rembish
    date: 10/17/2021
    test coverage: 100%
*/
describe('c-lwc-q-c-question-create', () => {
    // after each test, reset the DOM
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // declare the element variable
    let element;

    // before each test, set element to be an instance of the lwcQCQuestionCreate component
    beforeEach(() => {
        element = createElement('c-lwc-q-c-question-create', {
            is: LwcQCQuestionCreate
        });
    });

    it('Test the lightning-record-form', () => {

        // append the element to the DOM
        document.body.appendChild(element);

        // grab the form from the DOM
        const form = element.shadowRoot.querySelector("lightning-record-form");
        
        // makes sure there is no recordId before submitting the form
        expect(form.recordId).toBeFalsy();

        // simulate the onsuccess event 
        form.dispatchEvent(new CustomEvent("success"));
        
        // check to make sure the recordId is reset to null as expected
        return Promise.resolve().then(() => {
            expect(form.recordId).toBeFalsy();
        });
    });
});