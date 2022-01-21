import {LightningElement, wire, track} from 'lwc';
import getUpdatedCohortScore from '@salesforce/apex/updatedCohortLeaderboardHandler.getUpdatedCohortScore';

const COLUMNS = [
    {label: 'Team Name', fieldName: 'Name', hideDefaultActions:true, type: 'text'},
    {label: 'Average Score', fieldName: 'expr0', hideDefaultActions:true, type: 'Number'}
]

export default class UpdatedCohortLeaderboard extends LightningElement 
{
    @track teams;
    @track cohortName;
    @track columns = COLUMNS;
    @track error;

    @wire(getUpdatedCohortScore)
    wiredupdatedScore({ error, data }) 
    {
        if (data) 
        {
            this.teams = data;
            this.error = undefined;
            this.cohortName = 'Cohort Leaderboard for: ';
            console.log(this.teams);
        } 
        
        else if (error) 
        {
            this.error = error;
            this.teams = undefined;
        }
    }
}