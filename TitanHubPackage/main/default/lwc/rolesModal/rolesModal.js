import { api, LightningElement, wire } from 'lwc';
import getRole from '@salesforce/apex/ProjectController.getRole';
const CSS_CLASS = "modal-hidden";
export default class RolesModal extends LightningElement {
    showModal = false;
    role;

    @api show(){
        this.showModal = true;
    }
    handleDialogClose(){
        this.showModal = false;
    }
    addResponsibility(){
        
    }
    projectId = 'a0L7z0000004JaLEAU';
    @wire(getRole, {projectId: '$projectId'})
    fetchRole({error, data}){
        if(data){
            this.role = data.Roles_Responsibilities__c.slice(3,-4);
        }
        else if(error){
            console.error(error);
        }
    }
}