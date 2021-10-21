/* eslint-disable no-undef */
/*
Author: Veselin Georgiev
Date: 10/15/2021

*/

import { createElement } from "lwc";
import LwcHeroResultPage from "c/lwcHeroResultPage";
import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

import getTitanList from "@salesforce/apex/HeroResultPageController.getTitanList";
import getResultList from "@salesforce/apex/HeroResultPageController.getResultList";

//Titan json
const mockTitan = require('./data/titans.json');
// Realistic data with result list
const mockGetResultList = require('./data/getResultListMock.json');
// Empty json
const mockEmpty = require('./data/emptyJson.json');

//REGISTER WIRE getTitanList
const getTitansAdapter = registerApexTestWireAdapter(getTitanList);
//REGISTER WIRE getResultList
const getListAdapter = registerApexTestWireAdapter(getResultList);


// Mocking imperative Apex method call
jest.mock(
    '@salesforce/apex/HeroResultPageController.getResultList',
    () => ({
        default: jest.fn()
    }),
    { virtual: true }
);


describe("c-lwc-hero-result-page TESTING", () => {

    let component;
    // creating component element and append to the DOM
    beforeEach(() => {
        component = createElement("c-lwc-hero-result-page", {
            is: LwcHeroResultPage
        });
        document.body.appendChild(component);
    });

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    async function flushPromises() {
        return Promise.resolve();
    }

    // Helper function to wait until the microtask queue is empty. This is needed for promise
    // timing when calling imperative Apex.
    describe('Testing first @wire getTitanList', () => {
        it('Testing when we have data', () => {
            getTitansAdapter.emit(mockTitan);

            return Promise.resolve().then(() => {
                let titanDiv = component.shadowRoot.querySelectorAll('.titan-tab')[1];

                expect(titanDiv.textContent).toBe(mockTitan[0]);
            })
        })

        it('Testing if we throw an error', () => {
            getTitansAdapter.error();

            return Promise.resolve().then(() => {
                let titanDiv = component.shadowRoot.querySelectorAll('.titan-tab')[1];

                expect(titanDiv.textContent).toBe('See Code Assesment Results');
            })
        })
    })

    describe('Testing second @wire getResultList', () => {
        it('GetResultList @wire mockdata with 2 records ', () => {
            getListAdapter.emit(mockGetResultList);

            return Promise.resolve().then(() => {
                let myDivs = component.shadowRoot.querySelectorAll('.teest');

                expect(myDivs.length).toBe(mockGetResultList.length);
                expect(myDivs[0].textContent).toBe(mockGetResultList[0].Exam__r.Name);
                expect(myDivs[1].textContent).toBe(mockGetResultList[1].Exam__r.Name);
            })
        })

        it('GetResultList @wire mockdata with 0 records ', () => {
            getListAdapter.emit(mockEmpty);

            return Promise.resolve().then(() => {
                let myDivs = component.shadowRoot.querySelectorAll('.teest');

                expect(myDivs.length).toBe(0);
            })
        })

        it('Testing if we throw an error', () => {
            getListAdapter.error();

            return Promise.resolve().then(() => {
                let myDivs = component.shadowRoot.querySelectorAll('.teest');

                expect(myDivs[0]).toBe(undefined);
            })
        })
    })

    describe('Testing function onCAClick', () => {
        /*
        it('first one', () => {
           getResultList.mockResolvedValue(mockGetResultList);

            

            const myDiv = component.shadowRoot.querySelector('.onCAClick');
            myDiv.click();

            // await flushPromises();
            return new Promise(setImmediate).then(() => {
                const divs = component.shadowRoot.querySelectorAll('.kor');
                expect(divs.length).toBe(mockGetResultList.length);
              
            })
        })
        */
    })

    describe('On exam Click function', () => {
        it('first one', () => {
            const examDivs = component.shadowRoot.querySelectorAll('.teest');
            examDivs.click()

            return Promise.resolve().then(() => {
                console.log('tests')
            })
        })
    })

})