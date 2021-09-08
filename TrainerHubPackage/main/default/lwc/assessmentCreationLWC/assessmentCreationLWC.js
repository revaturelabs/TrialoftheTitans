import { LightningElement } from 'lwc';

export default class AssessmentCreationLWC extends LightningElement {
    SubmitClickHandler(){
        this.dispatchEvent(new CustomEvent('Submit'));
    }
    HideComponentHander(){
        this.dispatchEvent(new CustomEvent('Cancel'))
    }

}