/*
---Overhaul of the component by Sean Fowler to make the code functional, and more simplistic. Due to time constraints I removed subcatagory field that may be
 re introduced at a later date. removed un necassary buttons and made this component to be input into the exam interview component. 

 when button is clicked it will either make picklist appear or disapear. made the submit button call the submitQuestionFlag. 
 There are likely leftover components that need to be cleaned up. Itteration's 8 code appeared barely partly functional. 

*/
// Primary imports
import { LightningElement, api, wire, track } from 'lwc';
// Imports for looking up the contents of a picklist
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import EXAM_QUESTION_OBJECT from '@salesforce/schema/Exam_Question__c';
import CATEGORY_FIELD from '@salesforce/schema/Exam_Question__c.Flag_Category__c';
// Apex code imports
import flagQuestion from '@salesforce/apex/QuestionFlagUpdates.flagQuestion';
/**
 * This component allows the user to flag a question for review.
 */
export default class LwcQuestionFlag extends LightningElement {
    // When you use the @api decorator on a variable named recordId, it will be automatically filled with the record id
    // of whatever record page you are viewing... if this LWC is on a record page. It can also be filled manually.
    @api
    recordId
    // These two flags are used to track the state of this component.
    @track flagInProgress = false;
    @track submitted = false;
    @track noteState
    @track submittedState
    flagNotes

    categoryValue;
    // If an error occurs, putting its error message in here will make it appear in this LWC's footer.
    errorMessage;
    // These will store the picklist values for the Category.
    @track categoryList;
    // This defines the maximum length of the notes. Might want to update this later...
    maxNotesLength = 500;
    

    // ----------------------------------------------------------------------------------------------------------------
    // ---------------------------------- Code for retrieving Global Picklist values ----------------------------------
    // ----------------------------------------------------------------------------------------------------------------

    // We need the object info for Exam_Question__c in order to get at its picklists.
    @wire(getObjectInfo, { objectApiName: EXAM_QUESTION_OBJECT })
    objectInfo;
    

    // This uses the object info in order to look up the category picklist values.
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: CATEGORY_FIELD})
    getCatagoriesPicklistValues({ error, data }) {
        if (data) {
            let value = [];
            console.log('fools');
            console.log(data);
            for (let i=0;i<data.values.length;i++){
                value.push({label:data.values[i].label, value:data.values[i].value});
            }
            this.categoryList = value;
            console.log(this.categoryList)/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            return(value)
            
        } else if (error) {
            // Handle error
        }
    }

    // ----------------------------------------------------------------------------------------------------------------
    // -------------------------------------- Code for responding to user events --------------------------------------
    // ----------------------------------------------------------------------------------------------------------------

    /**
     * Event response: The user clicked the Flag button.
     * 
     * This method makes the category, subcategory, and notes visible to the user so that they can edit them. 
     * It also calls the asynchronous method that looks up the Exam_Question__c by its Id and tries to
     * populate the question accordingly.
     * 
     * Event response: The user clicked the Flag button a second time.
     * This just makes the category, and notes invisible. It's for when the user decides
     * that they don't want to flag the question after all.
     */

    flagButtonClicked(){
        console.log ("flagbuttclick");
        console.log (this.recordId)
        if(this.recordId && this.flagInProgress==false){
            this.flagInProgress = true;
    }else if(!this.recordId){
        let fail = "Record ID not loaded";
    }
    else{
        this.flagInProgress=false
    }

    }

   
    /**
     * Event response: The user picked a category from the combo box.
     * 
     * This looks up all of the subcategories that correspond to the picked category, and makes the
     * subcategory combo box hold just those.
     */
    categoryChanged(event){
        this.categoryValue = event.detail.value
        console.log(this.categoryValue);
    }

    /**
     * Event response: The user clicked the Submit button.
     * 
     * This makes the category, subcategory, and notes invisible again, and calls the asynchronous method
     * that actually pushes the flag data to Salesforce.
     */
    submitButtonClicked(){
        this.flagInProgress = false;
        this.submitQuestionFlag();
    }

    /**
     * Calls an Apex method to update the category, subcategory, and notes, as well as mark the question as
     * flagged. Some other component can worry about deactivating the flagged questions or removing them from
     * question pools, that's outside the scope of this component.
     * 
     * selectedValue
     * 
     * We shouldn't even get to this point unless the Exam_Question__c could be looked up by Id, but there
     * might still be an error if the update fails for some reason. If so, error text should be displayed.
     */
    async submitQuestionFlag(){
        console.log(this.categoryValue);
        this.flagNotes=this.template.querySelector(".flagNotesInput").value;
        console.log(this.flagNotes);
        
        let submitState = await flagQuestion({questionId: this.recordId, category: this.categoryValue, notes: this.flagNotes});
        console.log(submitState);
        if (submitState){
            console.log("true");
            this.submittedState = true;
        } else {
            this.errorMessage = 'Unable to submit question. Id ' + this.recordId + ' rejected the update.';
        }
        
    }
}