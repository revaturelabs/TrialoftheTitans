/*
    
    Author: Liam Hunt
    Description: Js for project creation/editing component
    Date Created: 10/23/21

*/

import { LightningElement, track,api, wire } from 'lwc';
import { ShowToastEvent} from "lightning/platformShowToastEvent"; 
import { updateRecord, getRecord } from 'lightning/uiRecordApi';
import getProjects from '@salesforce/apex/PortfolioProjectController.getProjects';
import { refreshApex } from '@salesforce/apex';
import userId from '@salesforce/user/Id';
import DESCRIPTION_FIELD from '@salesforce/schema/Project__c.Description__c';
import ROLES_FIELD from '@salesforce/schema/Project__c.Roles_Responsibilities__c';
import TECH_FIELD from '@salesforce/schema/Project__c.Technologies__c';
import PROJECTID_FIELD from '@salesforce/schema/Project__c.Id';


export default class LwcPortfolioProjects extends LightningElement {
    @api recordId;
    @track error;

    userId = userId;

    @wire(getProjects, { userIdFromPage: '$userId'})
    projects;

    
    
    get name() {
        return this.projects.data.fields.Name.value;
    }

    get description() {
        return this.projects.data.fields.Description__c.value;
    }

    get roles() {
        return this.projects.data.fields.Roles_Responsibilities__c.value;
    }

    get tech() {
        return this.projects.data.fields.Technologies__c.value;
    }

    handleSuccess() {
        //Show that record has been added to the database
        const evt = new ShowToastEvent({
          title: "Successful Creation",
          message: "Project was successfully added!",
          variant: "success"
        });
        this.dispatchEvent(evt);
    
        // Set the recordId to null so a new project can be entered
        const editForm = this.template.querySelector("lightning-record-form");
        editForm.recordId = null;
        refreshApex(this.projects);
      }

    updateProject() {
        
        const fields = {};
        fields[PROJECTID_FIELD.fieldApiName] = this.template.querySelector("[data-field='Id']").value;
        //fields[NAME_FIELD.fieldApiName] = this.template.querySelector("[data-field='Name']").value;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.template.querySelector("[data-field='Description']").value;
        fields[ROLES_FIELD.fieldApiName] = this.template.querySelector("[data-field='Roles']").value;
        fields[TECH_FIELD.fieldApiName] = this.template.querySelector("[data-field='Technologies']").value;

        const recordInput = { fields };

        updateRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Project updated',
                        variant: 'success'
                    })
                );
                // Display fresh data in the form
                return refreshApex(this.projects);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

}