import {api, LightningElement } from 'lwc';

export default class SquadButtonsM extends LightningElement {
    @api activeCohort;
    @api squadList = [];

    renderedCallback(){
        this.RenTest(this.event);
    }

    RenTest(event){
        if(this.activeCohort != null){
            console.log("in RenTest");
            let test = this.activeCohort;
            console.log(test.squadList);
            console.log('Name: ');
            console.log(test.squadList[0].squad.Name);

        }
    }
}