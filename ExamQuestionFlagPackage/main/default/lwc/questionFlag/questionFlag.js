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

    get awaitState(){
        return this.questionId == false;
    }
    
    get flagState() {
        return this.questionId == true && !this.noteState && !this.submittedState;
    }

    flagButtonClicked(){
        this.noteState = true;
    }

    unflagButtonClicked(){
        this.noteState = false;
    }

    reviewReasonChanged(){

    }

    submitButtonClicked(){
        
    }
}