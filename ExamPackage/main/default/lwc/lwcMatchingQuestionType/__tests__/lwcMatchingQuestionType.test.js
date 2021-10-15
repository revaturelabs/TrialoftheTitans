import { createElement } from 'lwc';
import LwcMatchingQuestionType from 'c/lwcMatchingQuestionType';

describe('c-lwc-matching-question-type', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    let element;

    beforeEach(() => {
        element = createElement('c-lwc-matching-question-type', {
            is: LwcMatchingQuestionType
        });
    });

    it('Testing if the header displays the correct information', () => {
        document.body.appendChild(element);
        // check the paragraph elements on the page to make sure they display what they are supposed to
        const paragraph = Array.from(element.shadowRoot.querySelectorAll("p"));
        expect(paragraph[0].textContent).toBe("created by: John Ngo");
        expect(paragraph[1].textContent).toBe("date: 9/29/2021 ");
        expect(paragraph[2].textContent).toBe("Desciption: This is a component that Display Matching Questions type on an Exam");
        expect(element.questionprompt).toBe("can you come here");
    });

    it('Test', () => {
        element.options = "h||e||l||l||o";
        element.answers = [{label: "hello", value: "world"}]
        document.body.appendChild(element);
    });
});