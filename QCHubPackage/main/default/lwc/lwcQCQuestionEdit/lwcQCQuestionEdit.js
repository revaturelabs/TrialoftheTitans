import { LightningElement, track, wire, api } from 'lwc';

import getQCQuestion from "@salesforce/apex/QCQuestionEditController.getQCQuestion";

const COLS = [
    { label: 'QC Question Name', fieldName: 'Name', editable: true },
    { label: 'Question Body', fieldName: 'Question_Body__c', editable: true },
    { label: 'Expected Answer', fieldName: 'Expected_Answer__c' },
    { label: 'QC Question Deck', fieldName: 'QC_Question_Deck__c' },
];

export default class LwcQCQuestionEdit extends LightningElement {

    @api recordId;
    columns = COLS;
    draftValues = [];
    qcQuestions;

    qcQuestions;
    error;

    @wire(getQCQuestion)
    wiredqcQuestions({ error, data }) {
        if (data) {
            this.qcQuestions = data;
            this.error = undefined;
            console.log(this.qcQuestions);
        } else if (error) {
            this.error = error;
            this.qcQuestions = undefined;
        }
    }

    handleSave(event) {

        const fields = {}; 
        fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
        fields[NAME_FIELD.fieldApiName] = event.detail.draftValues[0].Name;
        fields[Question_Body__c_FIELD.fieldApiName] = event.detail.draftValues[0].Question_Body__c;

        const recordInput = {fields};

        updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact updated',
                    variant: 'success'
                })
            );
            // Display fresh data in the datatable
            return refreshApex(this.contact).then(() => {

                // Clear all draft values in the datatable
                this.draftValues = [];

            });
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or reloading record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }

    connectedCallback() {
        // initialize component


    }




}