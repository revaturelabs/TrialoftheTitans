import { LightningElement, track } from 'lwc';

export default class MasteriesTab extends LightningElement {
    @track loadModal = false;
    @track skillToLoad;

    handleClick(event) {
        console.log(event.detail);
        this.skillToLoad = event.detail;
        //console.log(skillToLoad);
        this.loadModal = true;
        console.log('Hello');
    }
    closeModal(event) {
        this.loadModal = false;
    }

}