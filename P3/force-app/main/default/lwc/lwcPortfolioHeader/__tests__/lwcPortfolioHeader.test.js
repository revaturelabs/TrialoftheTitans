import lwcPortfolioHeader  from 'c/lwcPortfolioHeader';
import { createElement } from 'lwc';
import getUserName from '@salesforce/apex/PortfolioHeaderController.getUserName';
import { registerApexTestWireAdapter } from '@salesforce/wire-service-jest-util';

const mockData = require('./data/mockData.json');
const myAdapter = registerApexTestWireAdapter(getUserName);

describe('lwcPortfolioHeader component suite', () => {

    beforeEach(() => {

        const element = createElement('c-lwc-portfolio-header', {
            is: lwcPortfolioHeader
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        while (document.body.firstChild) {
          document.body.removeChild(document.body.firstChild);
        }

        jest.clearAllMocks();
    });

    function flushPromises() {
        return Promise.resolve();
    }
    
    //this test doesn't work and I have no idea how to make it work. 
    //Keeps returning [Object object] inside myHeader.textContent
    it('Testing for getUserName', async () => {
        const element = document.querySelector('c-lwc-portfolio-header');
        
        myAdapter.emit(mockData[0].data);
        
        await flushPromises();
        const myHeader = element.shadowRoot.querySelector('.userName');
        expect(myHeader.textContent).toBe(mockData[0].data);
    
    });


    //tests the setEdit method
    it('turning on edit mode', async () => {

        const element = document.querySelector('c-lwc-portfolio-header');
        const editButtonOn = element.shadowRoot.querySelector('.editButtonOn');
        editButtonOn.click();

        await flushPromises();
        
        const editModeOn = element.shadowRoot.querySelector('.editModeOn');
        expect(editModeOn).not.toBe(null);
       
    });

    //this mostly works but yet again... issues with @wire testing
    it('turning off edit mode after setting a title', async () => {

        const element = document.querySelector('c-lwc-portfolio-header');
        const editButtonOn = element.shadowRoot.querySelector('.editButtonOn');
        
        myAdapter.emit(mockData[0].data);
        
        editButtonOn.click();

        await flushPromises();

        let combobox = element.shadowRoot.querySelector('.titleSelect');
       
        combobox.dispatchEvent(new CustomEvent('change', {detail : {value:'Warrior'}}))
        const editButtonOff = element.shadowRoot.querySelector('.editButtonOff');
        editButtonOff.click();

        await flushPromises();

        const editModeOff = element.shadowRoot.querySelector('.editModeOff');
        expect(editModeOff).not.toBe(null);
        const nameTitle = element.shadowRoot.querySelector('.titleAndName');
        expect(nameTitle.textContent).toBe('Warrior John');
       
    });
})