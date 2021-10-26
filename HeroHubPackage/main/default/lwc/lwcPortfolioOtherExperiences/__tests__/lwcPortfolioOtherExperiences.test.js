import { createElement } from 'lwc';
import lwcPortfolioOtherExperiences from 'c/lwcPortfolioOtherExperiences';


describe('lwcPortfolioOtherExperiences test suite', () => {

    
    beforeEach(() => {

        const element = createElement('c-lwc-portfolio-other-experiences', {
            is:lwcPortfolioOtherExperiences
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        while(document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        jest.clearAllMocks;
    });

    function flushPromises() {
        return Promise.resolve();
    }

    // tests the add/cancel buttons. this works
    it('test add new experience/cancel buttons', async () => {
        
        const element = document.querySelector('c-lwc-portfolio-other-experiences');
        const addExButton = element.shadowRoot.querySelector('.addXpButton');
        addExButton.click();

        await flushPromises();

        const form = element.shadowRoot.querySelector('.form');
        expect(form).not.toBe(null);
        const cancelButton = element.shadowRoot.querySelector('.cancelButton');
        cancelButton.click();

        await flushPromises();
        expect( element.shadowRoot.childNodes[1].label).toBe('Add New Experience');
    });

    //tests adding a new experince, makes sure it appears on datatable
    // and then tests for a row action
    it('test adding new experience and datatable', async () => {
        
        const element = document.querySelector('c-lwc-portfolio-other-experiences');
        const addExButton = element.shadowRoot.querySelector('.addXpButton');
        addExButton.click();

        await flushPromises();

        const form = element.shadowRoot.querySelector('.form');
        expect(form.childNodes[0].classList.contains('recordEditForm')).toBe(true);

        const companyInput = element.shadowRoot.querySelector('.companyInput');
        const positionInput = element.shadowRoot.querySelector('.positionInput');
        const startInput = element.shadowRoot.querySelector('.startInput');
        const endInput = element.shadowRoot.querySelector('.endInput');
        const submitButton = element.shadowRoot.querySelector('.submitButton');
        const dataTable = element.shadowRoot.querySelector('.dataTable');

        companyInput.value = 'ABC';
        positionInput.value = 'Test';
        startInput.value = '2021-10-25';
        endInput.value = '2021-10-25';
        submitButton.click();

        await flushPromises();

        //this fails. Can't get to work. 
        //dataTable.data returns undefined for some reason
        expect(dataTable.data).toBe('ABC');

        //need to check the row action here once the above is sorted out
        /*
        const rowActionEvent = new CustomEvent('rowaction', {
            detail: {
                action: { name: "delete" },
                row: {}
            }
        });
        */
    });

})