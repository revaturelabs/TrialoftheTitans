import { api, LightningElement, wire, track } from 'lwc';
import getRole from '@salesforce/apex/ProjectController.getRole';
import getSkills from '@salesforce/apex/portfolioHelper.getSkills';
const CSS_CLASS = "modal-hidden";
export default class RolesModal extends LightningElement {
    
    role;
    @api projectId;
    @api titanId;
    defaultSkills;
    showInputBox = false;
    @track respSkills = [];
    @track respSkillId = 0;
    @track userSkills = [];
    @track userSkillId = 0;

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

    addResponsibility() {
        this.respSkillId++;
        this._respSkillId = this.respSkillId;
        console.log('ID: ' + this.respSkillId);
        const respSkill = { Id: this.respSkillId, skills: []};
        console.log('respSkill: ' + respSkill);
        this.respSkills.push(respSkill);
    }

    addSkill() {
        this.showInputBox = true;
    }

    inputSkill(event) {
        if(event.keyCode === 13) {
            this.showInputBox = false;
            this.userSkillId++;
            const userSkill = {Id: this.userSkillId, Name: event.target.value};
            this.userSkills.push(userSkill);
        }
    }

    selectSkill() {

    }

    save() {
        
    }

    @wire(getSkills, {projectId: '$projectId'})
    fetchSkills({error, data}) {
        if (data) {
            this.defaultSkills = data;
        }
        else if(error) {
            console.error(error);
        }
    }
    @wire(getRole, {projectId: '$projectId'})
    fetchRole({error, data}){
        if(data){
            this.role = data.Role__c;
        }
        else if(error){
            console.error(error);
        }
    }
}