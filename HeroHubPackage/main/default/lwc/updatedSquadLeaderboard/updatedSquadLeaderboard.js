import {LightningElement, wire, track} from 'lwc';
import getUpdatedScore from '@salesforce/apex/updatedSquadLeaderboardHandler.getUpdatedScore';

const COLUMNS = [
    {label: 'Hero Name', fieldName: 'Name', hideDefaultActions:true, type: 'text'},
    {label: 'Hero Score', fieldName: 'Weekly_Arete_Number__c', hideDefaultActions:true, type: 'Number'}
]
export default class UpdatedSquadLeaderboard extends LightningElement 
{
    @track squadName;
    @track accounts;
    @track columns = COLUMNS;
    @track error;

    @wire(getUpdatedScore)
    wiredupdatedScore({ error, data }) 
    {
        if (data) 
        {
            this.accounts = data;
            this.error = undefined;
            this.squadName = 'Squad Leaderboard for: ' + this.accounts[0].Squad__r.Name;
            console.log(this.accounts);
        } 
        
        else if (error) 
        {
            this.error = error;
            this.accounts = undefined;
        }
    }

}