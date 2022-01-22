import {LightningElement, wire, track} from 'lwc';
import getUpdatedCohortScore from '@salesforce/apex/updatedCohortLeaderboardHandler.getUpdatedCohortScore';

const COLUMNS = [
    {label: 'Team Name', fieldName: 'Name', hideDefaultActions:true, type: 'text'},
    {label: 'Average Score', fieldName: 'Average_Score', hideDefaultActions:true, type: 'Number'}
]

export default class UpdatedCohortLeaderboard extends LightningElement 
{
    @track cohorts;
    @track cohortName;
    @track columns = COLUMNS;
    @track error;

    @wire(getUpdatedCohortScore)
    wiredupdatedScore({ error, data }) 
    {
        if (data) 
        {
            this.cohorts = data;
            this.error = undefined;
            this.cohortName = 'Cohort Leaderboard for: ' + this.cohorts[0].C;
            console.log(this.cohorts);
        } 
        
        else if (error) 
        {
            this.error = error;
            this.cohorts = undefined;
        }
    }
}