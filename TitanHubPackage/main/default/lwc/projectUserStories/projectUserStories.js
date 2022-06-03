import { LightningElement, api, wire} from 'lwc';
import getUserStories from '@salesforce/apex/UserStoryController.getUserStories';
import getProjectSkill from '@salesforce/apex/UserStoryController.getProjectSkill';


export default class ProjectUserStories extends LightningElement {
    allUserStories;

    filteredUserStories;

    skillList;
    skillMap;
    
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
            this.skillMap = data;
            this.skillList = Object.keys(data);
            //console.error(data);
        }
        else if (error) {
            console.error(error);
        }
    }

    skillcheck(event){
        console.log(event.target.dataset.name);
        console.log(this.filteredUserStories);
        this.filteredUserStories = this.skillMap.get(event.target.dataset.name);
        
    }

}