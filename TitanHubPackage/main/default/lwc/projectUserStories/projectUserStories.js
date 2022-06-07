import { LightningElement, api, wire} from 'lwc';
import getUserStories from '@salesforce/apex/UserStoryController.getUserStories';
import getProjectSkill from '@salesforce/apex/UserStoryController.getProjectSkill';
import getProjectName from '@salesforce/apex/UserStoryController.getProjectName';
import getSkills from '@salesforce/apex/portfolioHelper.getSkills';

export default class ProjectUserStories extends LightningElement {
    allUserStories;
    filteredUserStories;

    filterSelected;
    skillList;
    skillMap;
    
    @api
    projectId;

    projectName;

    @wire(getProjectName, {projectId: '$projectId'})
    fetchProjectName({error, data}) {
        if (data) {
            console.log('getProjectName: ' + data);
            this.projectName = data;
        }
        else if (error) {
            console.error(error);
        }
    }

    @wire(getSkills, {projectId: '$projectId'})
    fetchProjectSkills({error, data}) {
        if(data) {
            this.skillList = data;
        }
        else if (error) {
            console.error(error);
        }
    }

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
    fetchProjectSkillMap({error, data}) {
        if (data) {            
            this.skillMap = data;
        }
        else if (error) {
            console.error(error);
        }
    }

    showFilter(event){
        this.filterSelected = true;
        this.filteredUserStories = this.skillMap[event.target.dataset.name];
    }

    showAllStories(){
        this.filterSelected = false;
        this.filteredUserStories = this.allUserStories;
    }
}