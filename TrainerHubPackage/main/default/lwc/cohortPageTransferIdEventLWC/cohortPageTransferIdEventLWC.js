import { LightningElement } from 'lwc';

export default class CohortPageTransferIdEventLWC extends LightningElement {
    CohortPageTransferIdEvent(){
        this.dispatchEvent(new CustomEvent('CohortPageTransferIdEventLWC'));
    }
}