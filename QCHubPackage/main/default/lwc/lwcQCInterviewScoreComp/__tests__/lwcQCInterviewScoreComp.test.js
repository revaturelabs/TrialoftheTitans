import { createElement } from 'lwc';
import LwcQCInterviewScoreComp from 'c/lwcQCInterviewScoreComp';

/*
    Created By: William Rembish
    date: 10/17/2021
    test coverage: 100%
*/
describe('c-lwc-q-c-interview-score-comp', () => {
    // after each test, reset the DOM
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // declare the element variable
    let element;

    // before each test, set element to be an instance of the lwcQCInterviewScoreComp component
    beforeEach(() => {
        element = createElement('c-lwc-q-c-interview-score-comp', {
            is: LwcQCInterviewScoreComp
        });
    });

    it('Test initialization and plus button', () => {

        // append the element to the DOM
        document.body.appendChild(element);

        // test to make sure the heroscore is initialized to 0 on initialization of the component
        expect(element.HeroScore).toBe(0);

        // test to make sure the lightning-input is properlly initialized
        const input = element.shadowRoot.querySelector("lightning-input");
        expect(input.type).toBe("number");
        expect(input.name).toBe("scorebox");
        expect(input.value).toBe(0);
        expect(input.placeholder).toBe(0);

        // test to make sure the button is setup correctly on initialization
        const plusButton = Array.from(element.shadowRoot.querySelectorAll("lightning-button"))[1];
        expect(plusButton.variant).toBe("brand");
        expect(plusButton.label).toBe("+");
        expect(plusButton.title).toBe("plus");

        // simulate an onclick event on the plus lightning-button 
        plusButton.dispatchEvent(new CustomEvent("click"));
        
        // make sure the onclick event handler for the plus lightning-button performs as expected
        return Promise.resolve().then(() => {
            expect(element.HeroScore).toBe(1);
        });
    });

    it('Test the minus button when 0', () => {

        // append the element to the DOM
        document.body.appendChild(element);

        // test to make sure the heroscore is 0
        expect(element.HeroScore).toBe(0);

        // test to make sure the button is setup correctly on initialization
        const minusButton = Array.from(element.shadowRoot.querySelectorAll("lightning-button"))[0];
        debugger;
        expect(minusButton.variant).toBe("brand");
        expect(minusButton.label).toBe("-");
        expect(minusButton.title).toBe("minus");

        // simulate an onclick event on the minus lightning-button when the hero score is 0
        minusButton.dispatchEvent(new CustomEvent("click"));

        // make sure the onclick event handler for the minus lightning-button performs as expected
        return Promise.resolve().then(() => {
            expect(element.HeroScore).toBe(0);
        });
    });

    it('Test the minus button when not 0', () => {
        // initialize the HeroScore to be 1
        element.HeroScore = 1;
        
        // append the element to the DOM
        document.body.appendChild(element);

        // test to make sure the heroscore is set properly to 1
        expect(element.HeroScore).toBe(1);

        // test to make sure the button is setup correctly on initialization
        const minusButton = Array.from(element.shadowRoot.querySelectorAll("lightning-button"))[0];
        expect(minusButton.variant).toBe("brand");
        expect(minusButton.label).toBe("-");
        expect(minusButton.title).toBe("minus");

        // simulate an onclick event on the minus lightning-button when the hero score is not 0
        minusButton.dispatchEvent(new CustomEvent("click"));

        // make sure the onclick event handler for the minus lightning-button performs as expected
        return Promise.resolve().then(() => {
            expect(element.HeroScore).toBe(0);
        });
    });
});