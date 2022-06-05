import { LightningElement, track, wire, api} from 'lwc';
import getResponsibilities from '@salesforce/apex/ResponsibilitiesController.getResponsibilities';
import skillChannel from '@salesforce/messageChannel/skillChannel__c';
import { subscribe, MessageContext } from 'lightning/messageService';

export default class LwcResponsibilities extends LightningElement {

    @api projectId;
    responsibilities;
    filteredResponsibilities;

    //used for filtering
    skillSelected;

    @wire(MessageContext)
    context;

    connectedCallback() {
        this.subscription = subscribe(
            this.context, skillChannel, (message) => this.handleMessage(message)
        );
    }

    @wire(getResponsibilities, {projectID: '$projectId'})
    fetchResponsibilities({error, data}) {
        if (data) {
            this.responsibilities = data;
            this.filteredResponsibilities = [...this.responsibilities];
        } else if (error) { 
            console.error(error);
        }
    }

    handleMessage(message) {
        if (message.projectId === this.projectId) {
            this.skillSelected = message.skillName;
        }
    }
}