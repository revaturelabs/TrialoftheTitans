import { api, LightningElement, wire } from 'lwc';
import getRole from '@salesforce/apex/ProjectController.getRole';
//import getProjectInfo from "@salesforce/apex/UserStoryController.getProjectInfo";
import projectOverview from '@salesforce/messageChannel/projectOverview__c';
import { subscribe, MessageContext } from 'lightning/messageService'
const CSS_CLASS = "modal-hidden";
export default class RolesModal extends LightningElement {
    showModal = false;
    role;
    @wire(MessageContext)
    context;
    @api projectId;
    @api titanId;
    @api show(){
        this.showModal = true;
    }
    handleDialogClose(){
        this.showModal = false;
    }
    addResponsibility(){
        
    }
    connectedCallback() {
        this.subscription = subscribe(
            this.context, projectOverview, (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        
        this.projectId = message.projectId;
    }
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