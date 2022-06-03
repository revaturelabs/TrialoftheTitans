import { LightningElement, api, wire } from 'lwc';
import getUserStories from '@salesforce/apex/UserStoryController.getUserStories';
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
}