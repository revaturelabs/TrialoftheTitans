import { LightningElement, wire, api } from 'lwc';
import InterviewList from '@salesforce/apex/QCInterviewController.InterviewList'

const columns = [
    { label: 'QC Interview', fieldName: 'Name', type: 'text'},
    { label: 'Hero', fieldName: 'hero', type: 'text'},
    { label: 'QC Week', fieldName: 'Week__c', type: 'text'},
    { label: 'QC Score', fieldName: 'QC_Score__c', type: 'text'},
];

export default class QcInterview2LWC extends LightningElement {

    columns = columns;
    data = [];
    
    @api
    cohortId;


    connectedCallback() {
        // InterviewList({cohortId: '$cohortId'})

        InterviewList({cohortId: ''})
        .then(result => {
            if (result) {
                let newData = [];

                //for loop to set key for the coloumn with data
                for( let i=0; i< result.length; i++ ){
                    //if data retrieved is null place value stating it is null
                    //if not null place data in the key for the column
                    if(result[i].Account__r == null){
                        newData[i] = {
                            Name: result[i].Name,
                            Week__c: result[i].Week__c,
                            QC_Score__c: result[i].QC_Score__c,
                            hero: "No Hero"
                         };
                    } else{

                        newData[i] = {
                            Name: result[i].Name,
                            Week__c: result[i].Week__c,
                            QC_Score__c: result[i].QC_Score__c,
                            hero: result[i].Account__r.Name
                         };
                    }
                }
                //set the new data to the table
                this.data = newData;
            }
        })
        .catch(error => {
            console.log('error: ', error);
        });
    }
}