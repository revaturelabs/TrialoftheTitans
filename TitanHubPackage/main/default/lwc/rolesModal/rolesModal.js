import { api, LightningElement, wire, track } from 'lwc';
import getRole from '@salesforce/apex/ProjectController.getRole';
import getSkills from '@salesforce/apex/portfolioHelper.getSkills';
import saveSkillResponsibilities from '@salesforce/apex/ProjectController.saveSkillResponsibilities';
import saveProject from '@salesforce/apex/ProjectController.saveProject';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
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

    resourceInputType;
    resourceLabel;
    github;
    wireframe;
    video;

    //modal controls
    showModal = false;
    showResourceModal = false;
    @track isModalOpen = false;
    @api show(){
        this.showModal = true;
    }

    handleDialogClose(){
        this.showModal = false;
    }

    //delete responsibility modal functions
    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    confirmDelete(event) {
        let respId = parseInt(event.target.dataset.respid);
        this.deleteResponsibility(respId);
        this.closeModal();
    }

    resourceHandler(event) {
        if (event.target.label === "Wireframes") {
            this.resourceInputType = "Wireframes";
            this.resourceLabel = "Wireframe link"
        }
        else if (event.target.label === "Github") {
            this.resourceInputType = "Github";
            this.resourceLabel = "Github link";
        }
        else {
            this.resourceInputType = "Video";
            this.resourceLabel = "Video link";
        }
        this.showResourceModal = true;
    }

    closeResourceModal() {
        this.showResourceModal = false;
        this.template.querySelector("[data-name='resource-input'").value = '';
    }

    saveResource() {
        const inputVal = this.template.querySelector("[data-name='resource-input'").value;
        if (this.resourceInputType === "Wireframes") {
            this.wireframe = inputVal;
        }
        else if (this.resourceInputType === "Github") {
            this.github = inputVal;
        }
        else {
            this.video = inputVal;
        }
        this.closeResourceModal();
        inputVal = '';
    }

    addResponsibility() {
        this.respSkillId++;
        const respSkill = { Id: this.respSkillId, description: '', skills: []};
        this.respSkills.push(respSkill);
    }

    deleteResponsibility(respId) {
        let i = this.findRespIndex(respId);
        this.respSkills.splice(i, 1);
    }

    updateDescription(event) {
        let respId = parseInt(event.target.dataset.respid);
        let i = this.findRespIndex(respId);
        this.respSkills[i].description = event.target.value;
    }

    findRespIndex(respId) {
        for (let i = 0; i < this.respSkills.length; i++) {
            if (this.respSkills[i].Id == respId) {
                return i;
            }
        }
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

    selectSkill(event) {
        let respId = parseInt(event.target.dataset.respid);
        let skillId = event.target.dataset.skillid;
        let skillName = event.target.dataset.skillname;
        if(event.target.variant === "brand") {
            event.target.variant = "neutral";
            this.unlinkSkill(respId, skillId);
        }
        else {
            event.target.variant = "brand";
            this.linkSkill(respId, skillId, skillName);
        }
    }

    linkSkill(respId, skillId, skillName) {
        let i = this.findRespIndex(respId);
        let skill = {'sobjectType': 'Custom_Skill__c'};
        skill.Id = skillId;
        skill.Name = skillName;
        this.respSkills[i].skills.push(skill);
    }

    unlinkSkill(respId, skillId) {
        let i = this.findRespIndex(respId);
        for(let j = 0; j < this.respSkills[i].skills.length; j++) {
            if (this.respSkills[i].skills[j].Id === skillId) {
                this.respSkills[i].skills.splice(j, 1);
            }        
        }
    }

    save() {
        this.handleDialogClose();
        for (let i = 0; i < this.respSkills.length; i++) {
            if (this.respSkills[i].description) {
                this.saveRespSkillData(i);
            }
        }
        let projectRecord = { 'sobjectType': 'Project__c'};
        this.role = this.template.querySelector("[data-name='role-input']").value;
        projectRecord.Id = this.projectId;
        if (this.role) {
            projectRecord.Role__c = this.role;
        }
        if (this.github) {
            projectRecord.Github__c = this.github;
        }
        if (this.wireframe) {
            projectRecord.Wireframe__c = this.wireframe;
        }
        if (this.video) {
            projectRecord.Video__c = this.video;
        }
        saveProject({ project: projectRecord })
            .then(() => {
                const toastEvent = new ShowToastEvent({
                    title: 'Success!',
                    message: 'Project and responsibilities successfully saved!',
                    variant: 'success'
                });
                this.dispatchEvent(toastEvent);
            })
            .catch(error => {
                console.error(error);
            });
    }

    saveRespSkillData(index) {
        let respRecord = { 'sobjectType': 'Responsibility__c'};
        respRecord.Description__c = this.respSkills[index].description;
        respRecord.Project__c = this.projectId;
        saveSkillResponsibilities({ resp: respRecord, skills: this.respSkills[index].skills })
            .then(result => {
                console.log('Success: ' + result);
            })
            .catch(error => {
                console.error(error);
            });
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