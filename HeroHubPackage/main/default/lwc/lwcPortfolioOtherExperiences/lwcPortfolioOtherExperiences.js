import deleteExperience from '@salesforce/apex/ExperiencesController.deleteExperience';
import getExperiences from '@salesforce/apex/ExperiencesController.getExperiences';
import updateExperiences from '@salesforce/apex/ExperiencesController.updateExperiences';
import { LightningElement, wire } from 'lwc';

export default class LwcPortfolioOtherExperiences extends LightningElement {

    isEdit = true;
    draftValues = [];
    experienceToDelete;

    
    columns = [
        {label:"Company", fieldName:"Company__c", type:"text",editable:true },
        {label:"Position", fieldName:"Position__c", type:"text",editable:true },
        {label:"Start Date", fieldName:"Start_Date__c", type:"date-local",editable:true },
        {label:"End Date", fieldName:"End_Date__c", type:"date-local",editable:true },
        { type: 'action', typeAttributes: { rowActions: { label: 'Delete', name: 'delete' } } }
    ];
    
    //wire to update the data table
    @wire(updateExperiences, { "experiences" : '$draftValues' })
    updateExperienceList;

    @wire(getExperiences)
    experienceList;

    @wire(deleteExperience, { "experience" : '$experienceToDelete' })
    deleteExperience;

    //saves the records on inline edit of data table
    onSave(event){
        this.draftValues = event.detail.draftValues;
        this.template.querySelector('dataTable').draftValues = [];
    }

    //setup to handle more row actions in the future
    handleRowAction(event) {
        var action = event.getParam('action');
        var row = event.getParam('row');

        switch (action.name) {
            case 'delete':
                this.experienceToDelete = row;
                break;
        }
    }

    edit() {
        this.isEdit = false;
    }

    cancel() {
        this.isEdit = true;
    }
}