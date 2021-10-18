import { createElement } from 'lwc';
import LwcQCInterview from 'c/lwcQCInterview';

/*
    Created By: William Rembish
    date: 10/17/2021
    test coverage: 100%
*/
describe('c-lwc-q-c-interview', () => {
    // after each test, reset the DOM
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // declare the element variable
    let element;

    // before each test, set element to be an instance of the lwcQCInterview component
    beforeEach(() => {
        element = createElement('c-lwc-q-c-interview', {
            is: LwcQCInterview
        });
    });

    it('Test ', () => {

        // append the element to the DOM
        document.body.appendChild(element);
        
        // test to see that all variables are set correctly on initilization of the component
        expect(element.Stage).toBe("Start");
        expect(element.CurrentHero).toBeUndefined();
        expect(element.WeekList).toStrictEqual([]);
        expect(element.Week).toBeUndefined();
        expect(element.CurrentQAList).toBeUndefined();
        expect(element.Cohort).toBeUndefined();
        expect(element.pageReference).toBeUndefined();
    });
});