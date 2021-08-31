import { LightningElement, api } from 'lwc';

export default class QcInterviewStartViewLightning extends LightningElement {
    @api Cohort;
    @api WeekList;
    @api Week = 'Week 1';
    constructor(){
        super();
        this.template.addEventListener('InterviewHeroEvent', StartInterview);
    }
    
    StartInterview(){
        this.dispatchEvent(new CustomEvent("SetWeekEvent",{"Week" : this.Week}));
        this.dispatchEvent(new CustomEvent("UpdateStageEvent",{"StageName" : "Interview"}));
    }
}