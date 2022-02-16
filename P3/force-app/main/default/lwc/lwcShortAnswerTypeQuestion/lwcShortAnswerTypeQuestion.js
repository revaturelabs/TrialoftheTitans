import { LightningElement, api } from "lwc";
/*
    Tested By: Chris Dirkswager
    date: 10/18/2021
    test coverage: 0%
    Update Notes: answer(cmp) was not working, error on load. 
    
    Comments:   LWC doesn't extend aura component functionality?
                I believe this will need to be redesigned with
                LMS(lightnign message service) or events.
                This would be iterated during exam interview,
                and therefor does not have an action attatched to it.
                an action within examinterview will query all questions.
                */
export default class LwcShortAnswerTypeQuestion extends LightningElement {
  @api
  ShortQuestion;

  // @depreciated during Iteration 5, 10/18/21
  //---------------------------------------------
  // returns answer to the examinterview component
  /*
     @api 
     answer(cmp){
         var answer = cmp.find("input").value;
         console.log(answer);
         return answer;
     }
     */
  //----------------------------------------------

  //NEW CODE: Added 10/18/21 by Chris returns input.
  //WARNING: THIS WILL NEED TO BE RECODED FOR END-TO-END testing.
  //This was a temporary fix for an already broken component.
  //Event could be used to bubble this component to the parent
  //OR LMS used to grab the information needed.
  //I am just doing testing so moderately unfamiliar with this.
  @api
  answer() {
    //grab and return value of text area.
    var input = this.template.querySelector("lightning-textarea");
    return input.value;
  }
}
