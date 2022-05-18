/* JS controller for the parent component that holds all components of the Masteries Tab
    on the portfolio page. Handles events to determine what skill is clicked to load
    the appropriate modal
    Authors: Tim Hinga, Adam Baird, Alberto Vergara, Austin McElrone
    Date: May 18, 2022 */
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