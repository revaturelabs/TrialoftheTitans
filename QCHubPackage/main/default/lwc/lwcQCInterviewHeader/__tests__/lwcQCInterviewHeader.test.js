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
        document.body.appendChild(element);
    });

    it('Test to see if start is active component on init', () => { 
        let active = element.shadowRoot.querySelector(".active");
        expect(active.textContent).toBe("Start");
    });

    it('Test to see if start is active component on CurrentStage set', () => { 
        element.CurrentStage = "Start";
        let active = element.shadowRoot.querySelector(".active");
        expect(active.textContent).toBe("Start");
    });

    it('Test to see if interview is active component on CurrentStage set', () => { 
        element.CurrentStage = "Interview";
        let active = element.shadowRoot.querySelector(".active");
        expect(active.textContent).toBe("interview");
    });

    it('Test to see if end is active component on CurrentStage set', () => { 
        element.CurrentStage = "End";
        let active = element.shadowRoot.querySelector(".active");
        expect(active.textContent).toBe("end");
    });


});