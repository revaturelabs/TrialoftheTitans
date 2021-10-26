import { deleteRecord } from 'lightning/uiRecordApi';
import getExperiences from '@salesforce/apex/ExperiencesController.getExperiences';
import { LightningElement, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';

export default class LwcPortfolioOtherExperiences extends LightningElement {

    isEdit = true;
    @track xp;
    @track wireRes;

    columns = [
        {label:"Company", fieldName:"Company__c", type:"text",editable:false },
        {label:"Position", fieldName:"Position__c", type:"text",editable:false },
        {label:"Start Date", fieldName:"Start_Date__c", type:"date-local",editable:false },
        {label:"End Date", fieldName:"End_Date__c", type:"date-local",editable:false },
        { type: 'action', typeAttributes: { rowActions: [{ label: 'Delete', name: 'delete' }] } }
    ];

    @wire(getExperiences)
    experienceList(res) {
        const { data, error } = res;
        this.xp = data;
        this.wireRes = res;
    };


    //setup to handle more row actions in the future
    handleRowAction(event) {
        var action = event.detail.action;
        var row = event.detail.row;
        switch (action.name) {
            case 'delete':
                deleteRecord(row.Id)
                .then(() => {
                    refreshApex(this.wireRes);
                });
                break;
        }
    }

    edit() {
        this.isEdit = false;
    }

    //this is called on record form success and when hitting cancel button
    //so refreshing apex here to refresh the dataTable
    cancel() {
        this.isEdit = true;
        refreshApex(this.wireRes);
    }
}