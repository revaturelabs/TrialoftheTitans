import {LightningElement, wire, track} from 'lwc';
import getSquadScore from '@salesforce/apex/SquadLeaderBoardHandler.getSquadScore';

const COLUMNS = [
    {label: 'Squad Name', fieldName: 'Name', hideDefaultActions:true, type: 'text'},
    {label: 'Squad Score', fieldName: 'Score__c', hideDefaultActions:true, type: 'Number'}
]

export default class SquadLeaderboard extends LightningElement {
    @track squads;
    @track columns = COLUMNS;
    @track error;

    @wire(getSquadScore)
    wiredsquadScore({ error, data }) 
    {
        if (data) 
        {
            this.squads = data;
            this.error = undefined;
            console.log(this.squads);
        } 
        
        else if (error) 
        {
            this.error = error;
            this.squads = undefined;
        }
    }

}