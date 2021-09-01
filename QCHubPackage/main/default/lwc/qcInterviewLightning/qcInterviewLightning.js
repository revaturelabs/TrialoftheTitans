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

    UpdateStage(event){
		this.Stage = event.target.value("StageName");
	}


	QAEvent(event){
		let questionAnswer = event.target.value("QA");
		this.CurrentQAList.push(questionAnswer);
        this.CurrentQAList = currentQAList;
	}


	SetHero(event){
		this.CurrentHero = event.target.value("SelectedHero");
	}


	SetWeek(event){
		this.Week = event.target.value("Week");
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