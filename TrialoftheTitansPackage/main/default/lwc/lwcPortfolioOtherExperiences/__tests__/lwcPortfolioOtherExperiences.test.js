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

    // tests the add/cancel buttons
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

    //tests adding a new experience, makes sure it appears on datatable, then row action
    it('test adding new experience and datatable', async () => {
        
        //adding new experience
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

        companyInput.value = 'ABC';
        positionInput.value = 'Test';
        startInput.value = '2021-10-25';
        endInput.value = '2021-10-25';
        submitButton.click();
    
        await flushPromises();

        //seeing it's in the datable
        const dataTable = element.shadowRoot.querySelector('lightning-datatable');

        //this fails before submitting the record but not after, telling me the test
        //accurately tests for the record being added to datatable
        expect(dataTable).not.toBe(null);

        /*testing delete row action
        need to get the table data to iterate over and run the rowaction event
        for each record to delete, then assert datable is null to show no records

        Not working. dataTable.data returns undefined. This is written how other 
        documentation is online so idk... 
        
        const rows = dataTable.data;

       
        rows.forEach(function(record){
            dataTable.dispatchEvent(new CustomEvent('rowaction', 
            { detail:  
                { action: { name: 'delete' }, row: { id: record.id }}
            })
            );
        });
        */
        

    });

})