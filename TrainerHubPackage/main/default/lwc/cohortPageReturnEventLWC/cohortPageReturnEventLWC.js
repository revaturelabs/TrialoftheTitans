import { LightningElement } from 'lwc';

export default class CohortPageReturnEventLWC extends LightningElement {
    CohortPageReturnEvent(){
        this.dispatchEvent(new CustomEvent('CohortPageReturnEvent'));
    }
}