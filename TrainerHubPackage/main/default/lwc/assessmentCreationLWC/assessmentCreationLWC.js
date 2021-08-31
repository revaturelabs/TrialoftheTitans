//////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Name: assessmentCreation
//  Author: Al Waisley/Chance Leonard
//  Description: JavaScript controller for assessmentCreation
//
////////////////////////////////////////////////////////////////////////////////////////////////////

import { LightningElement } from 'lwc';

export default class landingSkills extends LightningElement {
    SubmitClick(event) {
        //Give an alert for successful record creation and hide component
        alert("Succesfully created record");
        let assessmentForm = this.template.querySelector(`[data-id="assessment"]`);
        assessmentForm.className = 'toggle-hide';
    }
}