/*****************************************************************************************************
    Author: Deepika Chandran
    Description: LWC component that adds checkboxes and edits the about me record fields accordingly
    Date Created: 05/19/2022
    Modified Date: 05/23/2022
    Iteration XII
******************************************************************************************************/
import { LightningElement,track,api,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import ABOUT_OBJECT from '@salesforce/schema/About_Me_Record__c';
import RELOCATION from '@salesforce/schema/About_Me_Record__c.Relocation__c';
import REMOTE from '@salesforce/schema/About_Me_Record__c.Remote__c'; 
import ID from '@salesforce/schema/About_Me_Record__c.Id';
import USERID from '@salesforce/schema/About_Me_Record__c.User__c';
//calls the getAboutMeRecord method
import getRecords from '@salesforce/apex/AboutMeCreationController.getAboutMeRecord';
//calls the updateRemote method 
import updateRemote from '@salesforce/apex/AboutMeCreationController.updateRemote';

export default class DataDisplayWithImperative extends LightningElement {
   @api recordId; 
   @track errors;
   @track relocationCheck;
   @track remoteCheck;
    objectApiName=ABOUT_OBJECT;
    field1= RELOCATION;
    field2= REMOTE;
    idValue=ID;
    userId=USERID;
    @track about;
    @track wireValue;
    @track idValue;



    @wire(getRecords)
    educationList(value) {
        const {error, data} = value;
        if(data) {
            console.log(data);
            this.about = data;
            this.relocationCheck=data[0].Relocation__c;
            this.remoteCheck=data[0].Remote__c;
            this.idValue=data[0].Id;
        }
        else if(error) {console.log(error);}
        console.log(this.about);

        this.wireValue = value;
    }
    handleUpdate() 
    {
        updateRemote({aboutMeRecInput:this.relocationCheck, aboutMeRecInput:this.remoteCheck });
        const env = new ShowToastEvent({
            title: "Success",
            message: "Information Received.",
            variant: "success"
        });

        this.dispatchEvent(env);
        refreshApex(this.wireValue);

    }

}