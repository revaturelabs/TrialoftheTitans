import { LightningElement, api, wire } from 'lwc';
import getUserStories from '@salesforce/apex/UserStoryController.getUserStories';

export default class ProjectUserStories extends LightningElement {
    hasUserStories = false;
    allUserStories;
    filteredUserStories;

    //temporarily hard-coded value until path to titan is updated
    @api
    projectId = 'a0L7z0000004KbFEAU';

    @wire(getUserStories, {projectId: '$projectId'})
    fetchUserStories({error, data}) {
        if (data) {
            this.allUserStories = data;
            this.filteredUserStories = [...this.allUserStories];
            if (this.allUserStories.length > 0) {
                this.hasUserStories = true;
            }
        }
        else if (error) {
            console.error(error);
        }
    }
}