import {api, LightningElement } from 'lwc';

export default class SquadButtonsM extends LightningElement {
    @api ActiveCohort;
    @api SquadList = [];

    renderedCallback(){
        this.RenTest();
    }

    RenTest(event){
        if(this.ActiveCohort != null){
            console.log("in RenTest");
            let test = this.ActiveCohort;
            console.log(test.squadList);
            console.log('Name: ');
            console.log(test.squadList[0].squad.Name);

        }
    }
}