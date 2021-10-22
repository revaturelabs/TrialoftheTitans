import { createElement } from 'lwc';
import D3ChartTest from 'c/d3ChartTest';

/*
    Created By: William Rembish
    date: 
    test coverage: %
*/

describe('c-d3-chart-test', () => {
    // after each test, reset the DOM
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // declare the element variable
    let element;

    // before each test, set element to be an instance of the D3ChartTest component
    beforeEach(() => {
        element = createElement('c-d3-chart-test', {
            is: D3ChartTest
        });
    });

  // Helper function to wait until the microtask queue is empty. This is needed for promise
  // timing when calling imperative Apex.
  async function flushPromises() {
    return Promise.resolve();
  }

    it('T ', () => {
        element.d3Initialized = true;
        document.body.appendChild(element);

    });
});