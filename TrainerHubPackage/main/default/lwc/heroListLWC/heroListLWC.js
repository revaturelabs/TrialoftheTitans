import { LightningElement, api } from 'lwc';
import HeroList from '@salesforce/apex/HeroListController.HeroList'

const columns = [
    { label: 'Hero', fieldName: 'Name', type: 'text'},
    { label: 'Squad', fieldName: 'Squad__c', type: 'text'},
    { label: 'Team', fieldName: 'Team__c', type: 'text'},
    { label: '1-on-1', fieldName: 'Website', type: 'url', typeAttributes: { 
            label: 'Zoom link',
            target: '_self'
        },
    }
];

export default class HeroListLWC extends LightningElement {

    columns = columns;
    data = [];
    
    @api
    cohortId;

    connectedCallback() {
        HeroList({cohort: this.cohortId})
        .then(result => {
            if (result) {
                let newData = [];
                // loop through to get the names instead of the ids
                for (let i = 0; i < result.length; i += 1) {
                    newData[i] = {
                        Name: result[i].Name,
                        Squad__c: result[i].Squad__c ? result[i].Squad__r.Name : '',
                        Team__c: result[i].Team__c ? result[i].Team__r.Name : '',
                        Website: result[i].Website
                     };
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