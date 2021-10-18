import { createElement } from 'lwc';
import LwcQCInterviewEnd from 'c/lwcQCInterviewEnd';

/*
    Created By: William Rembish
    date: 10/17/2021
    test coverage: 100%
*/
describe('c-lwc-q-c-interview-end', () => {
    // after each test, reset the DOM
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // declare the element variable
    let element;

    // before each test, set element to be an instance of the lwcQCInterviewEnd component
    beforeEach(() => {
        element = createElement('c-lwc-q-c-interview-end', {
            is: LwcQCInterviewEnd
        });
    });

    it('Test ', () => {
        
        // append the element to the DOM
        document.body.appendChild(element);
        
        // test to make sure all of the elements are set to what they are expected to be in the js file
        expect(element.heroName).toBe("");
        expect(element.heroId).toBe("");
        expect(element.cohortId).toBe("");
        expect(element.week).toBe("");
        expect(element.answers).toStrictEqual([{}]);

        // test to make sure all of the h1 elements on the DOM are correct
        const headers = Array.from(element.shadowRoot.querySelectorAll("h1"));
        expect(headers[0].textContent).toBe("Select a Cohort:");
        expect(headers[1].textContent).toBe("QC Score:");
        expect(headers[2].textContent).toBe("Question Overview:");

        // test to make sure all of the p elements on the DOM are correct
        const paragraphs = Array.from(element.shadowRoot.querySelectorAll("p"));
        expect(paragraphs[0].textContent).toBe("NOTE: not sure if this is the correct componenet but i can replace if nessesary.");
        expect(paragraphs[1].textContent).toBe("NOTE: Reason Comp goes here.");
        expect(paragraphs[2].textContent).toBe("NOTE: BUTTON goes here.");
        expect(paragraphs[3].textContent).toBe("NOTE: Need the Question Overview Comp.");
    });
});