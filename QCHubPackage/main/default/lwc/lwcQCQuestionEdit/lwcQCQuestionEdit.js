import { LightningElement, track, wire, api } from 'lwc';

import getQuestion from '@salesforce/apex/QCQuestionEditController.getQuestion';

import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const COLS = [
    {label:"QC Question Name", fieldName:"Name", type:"text", editable: true },
    {label:"Question Body", fieldName:"Question_Body__c", type: 'text', editable: true},
    {label:"Expected Answer", fieldName:"Expected_Answer__c", type:"text", editable: true },
    {label:"QC Question Deck ", fieldName:"QC_Question_Deck__c", type: "lookup" }
];

export default class LwcQCQuestionEdit extends LightningElement {

    @api recordId;
    columns = COLS;
    draftValues = [];
    test= [1,2,3];
    @track error;
     @wire(getQuestion)
     Questions;
     @track data;
     saveDraftValues = [];

     constructor() {
        super();
        this.getallQuestion();
    }
    getallQuestion() {
        getQuestion()
        .then(result => {
            this.data = result;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while getting Accounts', 
                    message: error.message, 
                    variant: 'error'
                }),
            );
            this.data = undefined;
        });
    }



    handleSave(event) {
        this.saveDraftValues = event.detail.draftValues;
        const recordInputs = this.saveDraftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });

        // Updateing the records using the UiRecordAPi
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(res => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records Updated Successfully!!',
                    variant: 'success'
                })
            );
            this.saveDraftValues = [];
            return this.refresh();
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'An Error Occured!!',
                    variant: 'error'
                })
            );
        }).finally(() => {
            this.saveDraftValues = [];
        });
    }

    // This function is used to refresh the table once data updated
    async refresh() {
        await refreshApex(this.data);
 
    }

    exportClick(event){



        
    }

    connectedCallback() {
        // initialize component


    }




}