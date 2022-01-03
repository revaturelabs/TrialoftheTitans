import { LightningElement, api, wire } from 'lwc';
import lookupQuestion from '@salesforce/apex/QuestionFlagUpdates.lookupQuestion';
import flagQuestion from '@salesforce/apex/QuestionFlagUpdates.flagQuestion';


export default class QuestionFlag extends LightningElement {
    @api recordId;
    flagInProgress = false;
    submitted = false;
    errorMessage;
    reviewReasons = [];
    reviewSubReasons = [];

    get awaitState(){
        return this.recordId == false;
    }
    
    get flagState() {
        return this.recordId == true && this.flagInProgress == false && this.submitted == false;
    }

    get noteState(){
        return this.recordId == true && this.flagInProgress == true;
    }

    get submittedState(){
        return this.recordId == true && this.flagInProgress == false && this.submitted == true;
    }

    flagButtonClicked(){
        this.flagInProgress = true;
        this.retrieveQuestionFlagState();
    }

    async retrieveQuestionFlagState() {
        const categoryDropdown = this.template.querySelector('[data-name="category"]');
        const subcategoryDropdown = this.template.querySelector('[data-name="subcategory"]');
        const notesTextbox = this.template.querySelector('[data-name="flagNotesInput"]');
        let flagState = await lookupQuestion({questionId: this.recordId});
        if (flagState){
            if (flagState[0]){
                categoryDropdown.value = flagState[0];
                subcategoryDropdown.value = flagState[1];
                notesTextbox.value = flagState[2];
            }
        } else {
            this.errorMessage = 'Unable to look up question. Id ' + this.recordId + ' not found.';
            this.recordId = null;
        }
    }

    unflagButtonClicked(){
        this.flagInProgress = false;
    }

    reviewReasonChanged(){

    }

    submitButtonClicked(){
        
    }
}