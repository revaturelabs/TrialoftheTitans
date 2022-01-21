import { LightningElement, api, wire, track} from 'lwc';
import getSquadSum from '@salesforce/apex/teamLeaderBoardHandler.getSquadSum';

const COLUMNS = [
    {label: 'Team Name', fieldName: 'Name', hideDefaultActions:true, type: 'text'},
    {label: 'Team Score', fieldName: 'Squad_Sum__c', hideDefaultActions:true, type: 'Number'}
]

export default class TeamLeaderBoard extends LightningElement {
    @track teams;
    @track columns = COLUMNS;
    @track error;

    @wire(getSquadSum)
    wiredsquadSum({ error, data }) 
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
        }
    }

}