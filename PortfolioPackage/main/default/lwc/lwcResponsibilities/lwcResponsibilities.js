import { LightningElement, track, wire, api} from 'lwc';
import getResponsibilities from '@salesforce/apex/ResponsibilitiesController.getResponsibilities';
import getResponsibilitySkill from '@salesforce/apex/ResponsibilitiesController.getResponsibilitySkill';
import skillChannel from '@salesforce/messageChannel/skillChannel__c';
import { subscribe, MessageContext } from 'lightning/messageService';

export default class LwcResponsibilities extends LightningElement {

    @api 
    projectId;

    allResponsibilities;
    filteredResponsibilities;

    //used for filtering
    skillSelected;
    resMap;

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
            this.allResponsibilities = data;
            this.filteredResponsibilities = [...this.allResponsibilities];
        } else if (error) { 
            console.error(error);
        }
    }

    @wire(getResponsibilitySkill, {projectID: '$projectId'})
    fetchResponsibilitySkill({error, data}) {
        if (data) {
            console.log(JSON.stringify(data));
            this.resMap = data;
        }
        else if (error) {
            console.error(error);
        }
    }

    handleMessage(message) {
        if (message.projectId === this.projectId) {
            if(message.skillName === "clear"){
                this.filteredResponsibilities = this.allResponsibilities;
            }
            else {
                this.filteredResponsibilities = this.resMap[message.skillName];
            }
        }
    }
}