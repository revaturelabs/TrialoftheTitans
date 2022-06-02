import { LightningElement, api, wire } from 'lwc';
import getUserStories from '@salesforce/apex/UserStoryController.getUserStories';

export default class ProjectUserStories extends LightningElement {
    hasUserStories = false;
    allUserStories;
    filteredUserStories;
    projectId;

    @wire(getUserStories, {projectId: '$projectId'})
    fetchUserStories({error, data}) {
        if (data) {
            this.allUserStories = data;
            this.filteredUserStories = [...this.allUserStories];
            if (this.allUserStories) {
                this.hasUserStories = true;
            }
        }
        else if (error) {
            console.error(error);
        }
    }
}