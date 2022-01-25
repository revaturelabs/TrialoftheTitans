import { LightningElement, api, track } from "lwc";

export default class NumericalQuestionType extends LightningElement {
  //replaces the public attributes above
  @api questionprompt = "";
  @api answerText;
  /*
  showMe(event) {
    this.name=event.target.value;
    alert(this.name); 
  }
  */
  //same as remove item above
  @api
  answer(event) {
    this.answerText = event.detail.value;
  }
}