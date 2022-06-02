import { api, LightningElement } from 'lwc';
const CSS_CLASS = "modal-hidden";
export default class RolesModal extends LightningElement {
    showModal = false;

    @api show(){
        this.showModal = true;
    }
    handleDialogClose(){
        this.showModal = false;
    }
    addResponsibility(){
        
    }
}