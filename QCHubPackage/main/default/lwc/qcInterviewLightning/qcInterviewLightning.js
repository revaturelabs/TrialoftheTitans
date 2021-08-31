import { LightningElement, api } from 'lwc';

export default class QcInterviewLightning extends LightningElement {
    @api Stage = 'Start';
    @api Cohort;
    @api CurrentHero;
    @api WeekList;
    @api Week;
    @api CurrentQAList;
    @api StageStart = false;
    @api StageInterview = false;
    @api StageEnd = false;

    constructor(){
        this.template.addEventListener('UpdateStageEvent', this.UpdateStage);
        this.template.addEventListener('UpdateQAListEvent', this.QAEvent);
        this.template.addEventListener('SetWeekEvent', this.SetWeek);
        this.template.addEventListener('InterviewHeroEvent', this.SetHero);
    }
    
    connectedCallback(){
		//console.log("Retrieving Session Variables;");
		//console.log("QCInterview Init: ");

		let sessionCohort = sessionStorage.getItem('ActiveCohort');
		let sessionWeekList = sessionStorage.getItem('WeekList');
		//console.log(sessionWeekList);

		//console.log("Retrieving Session Variables;");
		if (sessionCohort){
			//console.log("In session retrieve;");
			this.Cohort = JSON.parse(sessionCohort);
		}
		if (sessionWeekList){
			//console.log("Cohort retrieved;");
			this.WeekList = JSON.parse(sessionWeekList);
		}
		//console.log("QCInterview Init complete.")
		//console.log("WeekList:");
		//console.log(component.get("v.WeekList"));
    }

    UpdateStage(){
		this.Stage = event.getParam("StageName");
	}


	QAEvent(){
		let questionAnswer = event.getParam("QA");
		this.CurrentQAList.push(questionAnswer);
        this.CurrentQAList = currentQAList;
	}


	SetHero(){
		this.CurrentHero = event.getParam("SelectedHero");
	}


	SetWeek(){
		this.Week = event.getParam("Week");
	}

    checkStageNameIsStart(){
        if(this.Stage == 'Start'){
            return 'active';
        } else{
            return '';
        }
    }
    checkStageNameIsInterview(){
        if(this.Stage == 'Interview'){
            return 'active';
        } else{
            return '';
        }
    }
    checkStageNameIsEnd(){
        if(this.Stage == 'End'){
            return 'active';
        } else{
            return '';
        }
    }
    checkStageNameIsStartBoolean(){
        if(this.Stage == 'Start'){
            return true;
        } else{
            return false;
        }
    }
    checkStageNameIsInterviewBoolean(){
        if(this.Stage == 'Interview'){
            return true;
        } else{
            return false;
        }
    }
    checkStageNameIsEndBoolean(){
        if(this.Stage == 'End'){
            return true;
        } else{
            return false;
        }
    }
    checkStageNameIsValidBoolean(){
        if(this.Stage == 'Start'||this.Stage == 'Interview' ||this.Stage == 'End'){
            return false;
        } else{
            return true;
        }
    }
}