import { LightningElement, api, wire } from 'lwc';
import lookupQuestion from '@salesforce/apex/QuestionFlagUpdates.lookupQuestion';
import flagQuestion from '@salesforce/apex/QuestionFlagUpdates.flagQuestion';


export default class QuestionFlag extends LightningElement {
    @api recordId;
    specifiedId;
    noteState = false;
    submittedState = false;
    reviewReasons = [];
    reviewSubReasons = [];

//this gets the id of the current question being displayed
    get questionId() {
        if (this.specifiedId){
            return this.specifiedId;
        } else if (this.recordId){
            return this.recordId;
        }
    }

    @api set questionId(value){
        this.specifiedId = value;
        this.noteState = false;
        this.submittedState = false;
    }
//this is the state of the flag when it does not have access to the question id
    get awaitState(){
        return this.questionId == false;
    }
    
    get flagState() {
        return this.questionId == true && !this.noteState && !this.submittedState;
    }

    //sets the flag to the note state to render the form for submitting flag reason information
    flagButtonClicked(){
        this.noteState = true;
    }
    //sets the flag back to close the form without submitting the flag reason information
    unflagButtonClicked(){
        this.noteState = false;
    }

    reviewReasonChanged(){

    }

    submitButtonClicked(){
        
    }
}