import { LightningElement, api } from "lwc";

export default class LwcQCInterview extends LightningElement {
  @api Stage = "Start";
  //@api CompanyAuthorizedDate;

  @api CurrentHero;
  @api WeekList = [];
  @api Week;
  @api CurrentQAList;
  @api Cohort;
  @api pageReference;

  /*
 * Commented out by William Rembish on 10/17/2021
 * Reason unused and untestable
get startView(){
    return this.Stage=='Start' ? true : false;  
}

get interviewQA(){
    return this.Stage=='Interview' ? true : false;
}

get interviewEnd(){
    return this.Stage=='End' ? true : false;
}
*/

  //LoadSessionData()
  connectedCallback() {
    /*   let myPageRef = pageReference;
    let sessionCohort = myPageRef.state.c__Cohort;
    this.Cohort = sessionCohort; */
  }

  /*
 * Commented out by William Rembish on 10/17/2021
 * Reason unused and untestable
UpdateStage(event){
    this.Stage= event.detail.value;
    console.log(event);
}

SetHero(event){
    this.CurrentHero=event.detail.value;
}
SetWeek(event){
    this.Week=event.detail.value;
}

AddQuestionAnswer(event){
    //Converting: let questionAnswer = event.getParam("QA"); where detail="QA"
    let questionAnswer=event.detail.value;

    this.CurrentQAList.push(questionAnswer);
}
*/
}