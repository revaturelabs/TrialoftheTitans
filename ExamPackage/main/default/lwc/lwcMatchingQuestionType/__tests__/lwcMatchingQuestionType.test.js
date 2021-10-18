import { createElement } from 'lwc';
import LwcMatchingQuestionType from 'c/lwcMatchingQuestionType';

/*
    Created By: William Rembish
    date: 10/17/2021
    test coverage: 100%
*/
describe('c-lwc-matching-question-type', () => {
    // after each test, reset the DOM
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // declare the element variable
    let element;

    // before each test, set element to be an instance of the lwcMatchingQuestionType component
    beforeEach(() => {
        element = createElement('c-lwc-matching-question-type', {
            is: LwcMatchingQuestionType
        });
    });

    it('Testing if the header displays the correct information', () => {
        // append the element to the DOM
        document.body.appendChild(element);
        // check the paragraph elements on the page to make sure they display what they are supposed to
        const paragraph = Array.from(element.shadowRoot.querySelectorAll("p"));
        expect(paragraph[0].textContent).toBe("created by: John Ngo");
        expect(paragraph[1].textContent).toBe("date: 9/29/2021 ");
        expect(paragraph[2].textContent).toBe("Desciption: This is a component that Display Matching Questions type on an Exam");
        expect(element.questionprompt).toBe("can you come here");
    });

    it('Testing if the value is properly changed in the onchange method', () => {
        // before appending the element to the DOM, set the values of the options and answers variables
        element.options = "h||e||y";
        element.answers = "y||o||u";
        // append the element to the DOM
        document.body.appendChild(element);
        // check to make sure each variable in the element is equal to what is expected
        expect(element.answerChoice).toBe(undefined);
        expect(element.options).toStrictEqual(['h','e','y']);
        expect(element.answers).toStrictEqual([{label: 'y', value: 'y'},{label: 'o', value: 'o'},
        {label: 'u', value: 'u'}]);
        expect(element.answer()).toBe(undefined);

        // simulated selecting an answer choice and 'dispatch' the event
        let combobox = element.shadowRoot.querySelector("lightning-combobox");
        combobox.dispatchEvent(new CustomEvent("change", {
            detail: {
                value: "y"
            }
        }));
        // check to make sure the onchange function performed as expected
        return Promise.resolve().then(() => {
            const outputElement = element.shadowRoot.querySelector("lightning-combobox");
            expect(outputElement.value).toStrictEqual([{"label": "y", "value": "y"}, {"label": "o", "value": "o"}, {"label": "u", "value": "u"}]);
        })
    });

    it('Test if only option is selected', () => {
        // checks the last line of code that isn't reached by the other tests
        element.options = "h||e||y";
        document.body.appendChild(element);
        expect(element.answers).toBe(undefined);
    })
});