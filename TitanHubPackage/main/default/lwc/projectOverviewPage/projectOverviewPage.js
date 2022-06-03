import { api, LightningElement, wire } from 'lwc';
import projectOverview from '@salesforce/messageChannel/projectOverview__c';
import { publish, MessageContext } from 'lightning/messageService';

export default class ProjectOverviewPage extends LightningElement {
    @api
    projectId;
    
    @wire(MessageContext)
    context;

    switchToSummary() {
        const data = {projectId: this.projectId, displayProjectOverview: false};
        publish(this.context, projectOverview, data);
    }

    handleSubmitProjectClick() {
        //nothing here yet
    }
}