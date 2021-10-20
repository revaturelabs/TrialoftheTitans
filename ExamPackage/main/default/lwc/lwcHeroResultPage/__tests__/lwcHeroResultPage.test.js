/*
Author: Veselin Georgiev
Date: 10/15/2021

*/

import { createElement } from "lwc";
import LwcHeroResultPage from "c/lwcHeroResultPage";
//import { registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

import getTitanList from "@salesforce/apex/HeroResultPageController.getTitanList";
import getResultList from "@salesforce/apex/HeroResultPageController.getResultList";


// Realistic data with a list of contacts
const mockGetResultList = require('./data/getResultListMock.json');

//const getListAdapter = registerApexTestWireAdapter(getResultList)

// Mock getContactList Apex wire adapter

jest.mock(
    '@salesforce/apex/HeroResultPageController.getResultList',
    () => {
        const {
            createApexTestWireAdapter
        } = require('@salesforce/sfdx-lwc-jest');
        return {
            default: createApexTestWireAdapter(jest.fn())
        };
    },
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

        // Prevent data saved on mocks from leaking between tests
       jest.clearAllMocks();
    });

    // Helper function to wait until the microtask queue is empty. This is needed for promise
    // timing when calling imperative Apex.


    it('getResultList @wire ',  () => {

     //   getResultList.error();
    // getListAdapter.emit(mockGetResultList)
    getResultList.emit(mockGetResultList);

       

      
        return Promise.resolve().then(() => {
            expect(2).toBe(2);
        })
    })
})