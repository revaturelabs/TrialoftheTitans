/************************************************************
 * Done by: Mohammed Azad
 * Creates functionality to deal with the experience 
 * component
 * Date: March 24 2022
 ************************************************************/

import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import EXPERIENCE_OBJECT from '@salesforce/schema/Experience__c';
import COMPANY_FIELD from '@salesforce/schema/Experience__c.Company__c';
import POSITION_FIELD from '@salesforce/schema/Experience__c.Position__c';
import START_DATE_FIELD from '@salesforce/schema/Experience__c.Start_Date__c';
import END_DATE_FIELD from '@salesforce/schema/Experience__c.End_Date__c';

import {refreshApex} from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';

import RETURN_EXPERIENCE from '@salesforce/apex/GetExperienceInformation.returnExperienceList';
export default class Portfolioexperience extends LightningElement
{
    @api recordId;
    @api objectApiName;

    @track modalChecker = false;

    experienceObject = EXPERIENCE_OBJECT;
    companyField = COMPANY_FIELD;
    positionField = POSITION_FIELD;
    startDateField = START_DATE_FIELD;
    endDateField = END_DATE_FIELD;

    @track experience;
    @track wireValue;

    @wire(RETURN_EXPERIENCE)
    experienceList(value) 
    {
        const {error, data} = value;
        if(data) {this.experience = data;}
        else if (error) {console.log(error);}
        console.log(this.experience);
        this.wireValue = value;
    };

    modalOpener() 
    {
        this.modalChecker = true;
    }
    modalCloser() 
    {
        const closeenv = new ShowToastEvent({
            title: "Canceled",
            message: "You cancelled inputting information.",
            variant: "error"
        });

        this.dispatchEvent(closeenv);
        this.modalChecker = false;
    }
    
    handleSuccess() 
    {
        const env = new ShowToastEvent({
            title: "Success",
            message: "Information Received.",
            variant: "success"
        });

        this.dispatchEvent(env);
        refreshApex(this.wireValue);
        this.modalChecker = false;
    }

    handleDelete(event)
     {
        let expId = event.currentTarget.dataset.expvalue;
        console.log(expId);
        deleteRecord(expId)
            .then(() => {
                this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Entry Has Been Deleted',
                    variant: 'success'
                })
                
            )
            refreshApex(this.wireValue);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error While Deleting Record',
                        message: error.message,
                        variant: 'error',
                    }),
                );
            });

    }

}