import { api, LightningElement } from 'lwc';

export default class QcInterviewStartLightning extends LightningElement {
    @api Cohort;

    TESTNEXT(){
        this.dispatchEvent(new CustomEvent('StartInterviewEvent',{ "SelectedHero" : this.Cohort.squadList[0].heroes[0]}));
        this.dispatchEvent(new CustomEvent('UpdateStageEvent',{ "StageName" : "Interview"}));
    }
}