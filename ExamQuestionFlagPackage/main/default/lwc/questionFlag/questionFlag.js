// Primary imports
import { LightningElement, api, wire } from 'lwc';
// Imports for looking up the contents of a picklist
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import EXAM_QUESTION_OBJECT from '@salesforce/schema/Exam_Question__c';
import CATEGORY_FIELD from '@salesforce/schema/Exam_Question__c.Flag_Category__c';
import SUBCATEGORY_FIELD from '@salesforce/schema/Exam_Question__c.Flag_Subcategory__c';
// Apex code imports
import lookupQuestion from '@salesforce/apex/QuestionFlagUpdates.lookupQuestion';
import flagQuestion from '@salesforce/apex/QuestionFlagUpdates.flagQuestion';

/**
 * This component allows the user to flag a question for review.
 */
export default class QuestionFlag extends LightningElement {
    // When you use the @api decorator on a variable named recordId, it will be automatically filled with the record id
    // of whatever record page you are viewing... if this LWC is on a record page. It can also be filled manually.
    @api recordId;
    // These two flags are used to track the state of this component.
    flagInProgress = false;
    submitted = false;
    // If an error occurs, putting its error message in here will make it appear in this LWC's footer.
    errorMessage;
    // These will store the picklist values for the Category and Subcategory.
    categoryList = [];
    subcategoryList = [];
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
    categoryPicklistValuesRetrieved({error, data}) {
        if(data) {
            /* It's worth noting that the result of getPicklistValues() comes back in kind of a weird way.
             *
             * It's like this:
             * 1 - getPicklistValues() returns a non-specific object that goes into the data variable above.
             * 2 - that object has a .data property, which is a Picklist Values object. Doc here: https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_picklist_values.htm
             * 3 - the PicklistValues object has a .values property, which is a list of Picklist Value objects.
             * 4 - each of those Picklist Value objects has a label and a value, which means they can become options in a combo box.
             * 
             * A combo box wants a list of objects that have labels and values. As a result, we want that .values property.
             * This leads us to using data.data.values below.
             */
            reviewReasons = data.data.values;
        } else if(error) {
            this.errorMessage = 'Unable to retrieve flag categories. Error: ' + error;
        }
    }

    // This uses the object info in order to look up the subcategory picklist values.
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: SUBCATEGORY_FIELD})
    subcategoryPicklistValuesRetrieved({error, data}) {
        if(data) {
            /* It's worth noting that the result of getPicklistValues() comes back in kind of a weird way.
             *
             * It's like this:
             * 1 - getPicklistValues() returns a non-specific object that goes into the data variable above.
             * 2 - that object has a .data property, which is a Picklist Values object. Doc here: https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_responses_picklist_values.htm
             * 3 - the PicklistValues object has a .values property, which is a list of Picklist Value objects.
             * 4 - each of those Picklist Value objects has a label and a value, which means they can become options in a combo box.
             * 
             * A combo box wants a list of objects that have labels and values. As a result, we want that .values property.
             * This leads us to using data.data.values below.
             */
            reviewSubReasons = data.data.values;
        } else if(error) {
            this.errorMessage = 'Unable to retrieve flag subcategories. Error: ' + error;
        }
    }

    // ----------------------------------------------------------------------------------------------------------------
    // ----------------------------------- Code for tracking the component's state ------------------------------------
    // ----------------------------------------------------------------------------------------------------------------

    /**
     * This should be true if this LWC is still waiting for an Exam_Question__c to display. It needs the Id.
     */
    get awaitState(){
        return this.recordId == false;
    }
    
    /**
     * This should be true if this LWC has a record Id, but the user isn't trying to flag the question.
     */
    get flagState() {
        return this.recordId == true && this.flagInProgress == false && this.submitted == false;
    }

    /**
     * This should be true if this LWC has a record Id, and the user is trying to flag the question.
     */
    get noteState(){
        return this.recordId == true && this.flagInProgress == true;
    }

    /**
     * This should be true if the user flagged the question.
     */
    get submittedState(){
        return this.recordId == true && this.submitted == true;
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
     */
    flagButtonClicked(){
        this.flagInProgress = true;
        this.retrieveQuestionFlagState();
    }

    /**
     * Calls an Apex method to look up the Exam_Question__c by its Id and get its category, subcategory, and notes
     * if they are already filled in.
     * 
     * If the Id can't be looked up at all, we've got an error on our hands.
     * 
     * If it can be looked up but we get back an empty list, that means the question isn't currently flagged,
     * and there's no need to populate anything on the UI side of things.
     * 
     * If the list isn't empty, that means the question is already flagged, and we should populate the UI
     * with the details of the current flag. This way the user can add to them or update them, if they see fit.
     */
    async retrieveQuestionFlagState() {
        let flagState = await lookupQuestion({questionId: this.recordId});
        if (flagState){
            if (flagState[0]){
                const categoryDropdown = this.template.querySelector('[data-name="category"]');
                const subcategoryDropdown = this.template.querySelector('[data-name="subcategory"]');
                const notesTextbox = this.template.querySelector('[data-name="flagNotesInput"]');
                categoryDropdown.value = flagState[0];
                subcategoryDropdown.value = flagState[1];
                notesTextbox.value = flagState[2];
            }
        } else {
            this.errorMessage = 'Unable to look up question. Id ' + this.recordId + ' not found.';
            this.recordId = null;
        }
    }

    /**
     * Event response: The user clicked the Flag button a second time.
     * 
     * This just makes the category, subcategory, and notes invisible again. It's for when the user decides
     * that they don't want to flag the question after all.
     */
    unflagButtonClicked(){
        this.noteState = false;
    }

    /**
     * Event response: The user picked a category from the combo box.
     * 
     * This looks up all of the subcategories that correspond to the picked category, and makes the
     * subcategory combo box hold just those.
     */
    categoryChanged(){
        const categoryDropdown = this.template.querySelector('[data-name="category"]');
        const subcategoryDropdown = this.template.querySelector('[data-name="subcategory"]');
        let subReasons = [];
        for (let subcategory of this.subcategoryList){
            // The subcategories' API names begin marked with the category names they're for, 
            // except for Other which is for every category.
            if (subcategory.value.startsWith(categoryDropdown.value) || subcategory.value == 'Other'){
                // Keep in mind that the combo box wants something with a label and a value.
                // We have to push the whole subcategory to the list, not just its value.
                subReasons.push(subcategory);
            }
        }
        subcategoryDropdown.options = subReasons;
    }

    /**
     * Event response: The user clicked the Submit button.
     * 
     * This makes the category, subcategory, and notes invisible again, and calls the asynchronous method
     * that actually pushes the flag data to Salesforce.
     */
    submitButtonClicked(){
        this.flagInProgress = false;
        this.retrieveQuestionFlagState();
    }

    /**
     * Calls an Apex method to update the category, subcategory, and notes, as well as mark the question as
     * flagged. Some other component can worry about deactivating the flagged questions or removing them from
     * question pools, that's outside the scope of this component.
     * 
     * We shouldn't even get to this point unless the Exam_Question__c could be looked up by Id, but there
     * might still be an error if the update fails for some reason. If so, error text should be displayed.
     */
    async submitQuestionFlag(){
        const categoryDropdown = this.template.querySelector('[data-name="category"]');
        const subcategoryDropdown = this.template.querySelector('[data-name="subcategory"]');
        const notesTextbox = this.template.querySelector('[data-name="flagNotesInput"]');
        let submitState = await flagQuestion({questionId: this.recordId, category: categoryDropdown.value, subcategory: subcategoryDropdown.value, notes: notesTextbox.value});
        if (submitState){
            this.submitted = true;
        } else {
            this.errorMessage = 'Unable to submit question. Id ' + this.recordId + ' rejected the update.';
        }
        
    }
}