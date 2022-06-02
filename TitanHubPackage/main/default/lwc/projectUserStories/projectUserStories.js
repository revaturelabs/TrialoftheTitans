import { LightningElement, api, wire } from 'lwc';
import getUserStories from '@salesforce/apex/UserStoryController.getUserStories';
import projectOverview from '@salesforce/messageChannel/projectOverview__c';
import { subscribe, MessageContext } from 'lightning/messageService';
export default class ProjectUserStories extends LightningElement {
    hasUserStories = false;
    allUserStories;
    filteredUserStories;
    projectId;

    @wire(MessageContext)
    context;

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
    
    connectedCallback() {
        this.subscription = subscribe(
            this.context, projectOverview, (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.projectId = message.projectId;
    }
}