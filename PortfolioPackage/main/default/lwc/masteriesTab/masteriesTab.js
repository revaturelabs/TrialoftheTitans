import { LightningElement } from 'lwc';

export default class MasteriesTab extends LightningElement {
    loadModal = false;
    skillToLoad = null;
    handleClick(event) {
        this.loadModal = true;
        this.skillToLoad = event.detail;
    }
    closeModal() {
        loadModal = false;
    }

}