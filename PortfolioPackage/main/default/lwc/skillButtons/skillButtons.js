import { LightningElement, wire, api } from 'lwc';
import getSkills from '@salesforce/apex/portfolioHelper.getSkills';
import skillChannel from '@salesforce/messageChannel/skillChannel__c';
import { publish, MessageContext } from 'lightning/messageService';
export default class SkillButtons extends LightningElement {
    @api projectId;
    skills;
    skillSelected;

    @wire(MessageContext)
    context;

    @wire(getSkills, {projectId: '$projectId'})
    fetchSkillNames({error, data}) {
        if (data) {
            this.skills = data;
        }
        else if (error) {
            console.error(error);
        }
    }

    handleClick(event){
        this.skillSelected = true;
        const data = {projectId: this.projectId, skillName: event.target.label};
        publish(this.context, skillChannel, data);
    }

    clearFilter(event){
        this.skillSelected = false;
        
        const data = {projectId: this.projectId, skillName: "clear"};
        publish(this.context, skillChannel, data);
    }   
}
