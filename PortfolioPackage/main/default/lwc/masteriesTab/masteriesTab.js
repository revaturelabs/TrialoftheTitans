import { LightningElement, track } from 'lwc';

export default class MasteriesTab extends LightningElement {
    @track loadModal = false;
    @track skillToLoad;

    handleClick(event) {
        this.skillToLoad = event.detail;
        this.loadModal = true;
    }
    closeModal(event) {
        this.loadModal = false;
    }

}