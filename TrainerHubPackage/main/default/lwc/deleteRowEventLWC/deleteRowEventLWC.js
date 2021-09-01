import { LightningElement } from 'lwc';

export default class DeleteRowEventLWC extends LightningElement {
    DeleteRowEvent(){
        this.dispatchEvent(new CustomEvent('DeleteRowEvent'));
    }
}