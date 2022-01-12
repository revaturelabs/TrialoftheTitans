import { createElement } from 'lwc';
import LwcQCInterviewHeader from 'c/lwcQCInterviewHeader';

describe('c-lwc-q-c-interview-header', () => {

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    let element;

    beforeEach(() => {
        element = createElement('c-lwc-q-c-interview-header', {
            is: LwcQCInterviewHeader
        });
    });

    it('Test to see if start is active component on init', () => { 
        document.body.appendChild(element);
        let active = element.shadowRoot.querySelector(".active");
        expect(active.textContent).toBe("Start");
    });

    it('Test to see if start is active component on CurrentStage set', () => { 
        element.CurrentStage = "Start";
        document.body.appendChild(element);
        let active = element.shadowRoot.querySelector(".active");
        expect(active.textContent).toBe("Start");
    });

    it('Test to see if interview is active component on CurrentStage set', () => { 
        element.CurrentStage = "Interview";
        document.body.appendChild(element);
        let active = element.shadowRoot.querySelector(".active");
        expect(active.textContent).toBe("Interview");
    });

    it('Test to see if end is active component on CurrentStage set', () => { 
        element.CurrentStage = "End";
        document.body.appendChild(element);
        let active = element.shadowRoot.querySelector(".active");
        expect(active.textContent).toBe("End");
    });


});