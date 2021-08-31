//////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Name: assessmentCreation
//  Author: Al Waisley/Chance Leonard
//  Description: JavaScript controller for assessmentCreation
//
////////////////////////////////////////////////////////////////////////////////////////////////////

import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class landingSkills extends LightningElement {
    SubmitClick(event) {
        //Give an alert for successful record creation and hide component
        this.dispatchEvent( new ShowToastEvent({
            title: 'Success',
            message: 'Succesfully created record',
            variant: 'success'
        }));
        let assessmentForm = this.template.querySelector(`[data-id="assessment"]`);
        assessmentForm.className = 'toggle-hide';
    }
}