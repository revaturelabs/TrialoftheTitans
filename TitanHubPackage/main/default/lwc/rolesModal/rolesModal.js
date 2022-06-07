import { api, LightningElement, wire, track } from 'lwc';
import getRole from '@salesforce/apex/ProjectController.getRole';
import getSkills from '@salesforce/apex/portfolioHelper.getSkills';
import saveSkillResponsibilities from '@salesforce/apex/ProjectController.saveSkillResponsibilities';
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

    //delete responsibility modal functions
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
        const respSkill = { Id: this.respSkillId, skills: []};
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

    selectSkill(event) {
        let selected = 'rgb(230, 255, 234)';
        let unSelected = 'rgb(255, 255, 255)';
        let respId = event.target.dataset.respid;
        let skillId = event.target.dataset.skillid;
        let skillName = event.target.dataset.skillname;
        if(event.target.style.backgroundColor === selected) {
            event.target.style.backgroundColor = unSelected;
            this.unlinkSkill(respId, skillId, skillName);
        }
        else {
            event.target.style.backgroundColor = selected;
            this.linkSkill(respId, skillId);
        }
    }

    linkSkill(respId, skillId, skillName) {
        let index = respId - 1;
        let skill = {'sobjectType': 'Custom_Skill__c'};
        skill.Id = skillId;
        skill.Name = skillName;
        this.respSkills[index].skills.push(skill);
    }

    unlinkSkill(respId, skillId) {
        let index = respId - 1;
        for(let i = 0; i < this.respSkills[index].skills.length; i++) {
            if (this.respSkills[index].skills[i] === skillId) {
                this.respSkills[index].skills.splice(i, 1);
            }
        }
        console.log('remove: ' + this.respSkills[index].skills)
    }

    save() {
        for (let i=0; i < this.respSkills.length; i++) {
            let selectorStr = "lightning-input[data-id='" + this.respSkills[i].Id + "']";
            let description = this.template.querySelector(selectorStr).value;
            this.saveData(i, description);
        }
        this.handleDialogClose();
    }

    saveData(index, description) {
        let respRecord = { 'sobjectType': 'Responsibility__c'};
        respRecord.Description__c = description;
        respRecord.Project__c = this.projectId;
        saveSkillResponsibilities({ resp: respRecord, skills: this.respSkills[index].skills})
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