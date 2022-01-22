import { LightningElement, wire, track } from 'lwc';
import getWeeksWon from '@salesforce/apex/updatedTeamLeaderBoardHandler.getWeeksWon';

const COLUMNS = [
    { label: 'Team Name', fieldName: 'Team', hideDefaultActions: true, type: 'text' },
    { label: 'Weeks won', fieldName: 'Weeks_Won', hideDefaultActions: true, type: 'Number' }
]

export default class UpdatedTeamLeaderboard extends LightningElement 
{
    @track teams;
    @track columns = COLUMNS;
    @track error;

    @wire(getWeeksWon)
    wiredWeeksWon({ error, data }) 
    {
        if (data) 
        {
            this.teams = data;
            this.error = undefined;
            console.log(this.teams);
        } 
        else if (error) 
        {
            this.error = error;
            this.teams = undefined;
            console.log(this.error);
        }
    }
}