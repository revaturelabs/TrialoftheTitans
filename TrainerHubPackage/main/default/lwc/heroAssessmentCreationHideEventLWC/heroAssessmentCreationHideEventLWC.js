import { LightningElement } from 'lwc';

export default class HeroAssessmentCreationHideEventLWC extends LightningElement {
    HeroAssessmentCreationHideEvent(){
        this.dispatchEvent(new CustomEvent('HeroAssessmentCreationHideEvent'));
    }
}