import { LightningElement, api, wire } from 'lwc';
import getUserStories from '@salesforce/apex/UserStoryController.getUserStories';
import getProjectSkill from '@salesforce/apex/UserStoryController.getProjectSkill';

export default class ProjectUserStories extends LightningElement {
    allUserStories;
    filteredUserStories;
    
    @api
    projectId;

    @wire(getUserStories, {projectId: '$projectId'})
    fetchUserStories({error, data}) {
        if (data) {
            this.allUserStories = data;
            this.filteredUserStories = [...this.allUserStories];
        }
        else if (error) {
            console.error(error);
        }
    }

    @wire(getProjectSkill, {projectId: '$projectId'})
    fetchProjectSkills({error, data}) {
        if (data) {
            this.skillList = data;
            console.error(data);
        }
        else if (error) {
            console.error(error);
        }
    }

    skillcheck(){
        
        
    }
    
}