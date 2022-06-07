import { api, LightningElement, wire, track } from 'lwc';
import getRole from '@salesforce/apex/ProjectController.getRole';
//import getProjectInfo from "@salesforce/apex/UserStoryController.getProjectInfo";
import projectOverview from '@salesforce/messageChannel/projectOverview__c';
import { subscribe, MessageContext } from 'lightning/messageService'
import getProjectInfo from "@salesforce/apex/UserStoryController.getProjectInfo";
const CSS_CLASS = "modal-hidden";
export default class RolesModal extends LightningElement {
    
    role;
    @wire(MessageContext)
    context;
    projectId;
    @api titanId;


    //modal controls
    showModal = false;
    @track isModalOpen = false;
    @api show(){
        this.showModal = true;
    }
    handleDialogClose(){
        this.showModal = false;
    }
    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }
    confirmDelete() {
        this.isModalOpen = false;
        // responsibility should be destroyed here
    }
    //get project info and Id
    @wire(getProjectInfo,{titanId: '$titanId'})
    getProject({error, data}) {
        if (data) {
            this.projectId = data.Id;
        }
        else if (error) {
            console.error(error);
        }
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
        console.log('test');
    }
    @wire(getRole, {projectId: '$projectId'})
    fetchRole({error, data}){
        if(data){
            this.role = data.Role__c.slice(3,-4);
        }
        else if(error){
            console.error(error);
        }
    }
    

    
    
    
}