import { LightningElement, track, wire, api } from 'lwc';

import getQuestion from '@salesforce/apex/QCQuestionEditController.getQuestion';
import deleteQuestions from '@salesforce/apex/QCQuestionEditController.deleteQuestions';
import deleteQCQuestionRows from '@salesforce/apex/QCQuestionEditController.deleteQCQuestionRows';


import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

var actions = [
    
    {label: 'delete', name: 'delete'},
    
];

const COLS = [
    {label:"QC Question Name", fieldName:"Name", type:'text', editable: true },
    {label:"Question Body", fieldName:"Question_Body__c", type: 'text', editable: true},
    {label:"Expected Answer", fieldName:"Expected_Answer__c", type:'text', editable: true },
    //{label:"QC Question Deck ", fieldName:"QC_Question_Deck__c.Name", type:"lookup",sortable : true},
    {type: 'action', typeAttributes: { rowActions: actions } }
];

export default class LwcQCQuestionEdit extends LightningElement {

    @api recordId;
    columns = COLS;
    draftValues = [];
    @track error;
     @wire(getQuestion)
     Questions;
     @track data;
     saveDraftValues = [];
     clickedButton;
     selectedRecords = [];
  

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

    connectedCallback() {
        // initialize component

        this.getallQuestion();
        

    }

    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;
        switch (action.name) {

                case 'delete':
                    this.deleteQC(row);
     }

 }

    deleteQC(currentRow) {
        let currentRecord = [];
        currentRecord.push(currentRow.Id);

    // calling apex class method to delete the selected contact
        deleteQuestions({questions: currentRecord})
            .then(result => {
         window.console.log('result ====> ' + result);

        // refreshing table data using refresh apex
         return alert("Record is deleted")

    })
    .catch(error => {
        window.console.log('Error ====> '+error);
        this.dispatchEvent(new ShowToastEvent({
            title: 'Error!!', 
            message: error.message, 
            variant: 'error'
        }),);
    });
}


    





}