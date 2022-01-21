import { LightningElement, track, wire } from 'lwc';
import getCohortScore from '@salesforce/apex/cohortLeaderBoardHandler.getCohortScore';

const COLUMNS = [
    {label: 'Cohort Name', fieldName: 'Name', hideDefaultActions:true, type: 'text'},
    {label: 'Cohort Score', fieldName: 'Average_Score__c', hideDefaultActions:true, type: 'double'}
]

export default class CohortLeaderBoard extends LightningElement {
    @track cohorts;
    @track columns = COLUMNS;
    @track error;

    @wire(getCohortScore)

    wiredcohortScore({ error, data }) 
    {
        if (data) 
        {
            this.cohorts = data;
            this.error = undefined;
            console.log(this.cohorts);
        } 
        
        else if (error) 
        {
            this.error = error;
            this.cohorts = undefined;
        }
    }
}