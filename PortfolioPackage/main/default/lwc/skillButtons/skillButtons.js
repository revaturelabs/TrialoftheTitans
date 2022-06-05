import { LightningElement, wire, api } from 'lwc';
import getSkills from '@salesforce/apex/portfolioHelper.getSkills';
export default class SkillButtons extends LightningElement {
    @api projectId;
    skills;

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
        const label = event.target.label;
    }
}
