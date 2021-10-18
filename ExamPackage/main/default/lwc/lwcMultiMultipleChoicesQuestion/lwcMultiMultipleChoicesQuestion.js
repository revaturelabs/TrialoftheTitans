import { api, LightningElement } from "lwc";

export default class LwcMultiMultipleChoicesQuestion extends LightningElement {
  @api
  answerChoices;

  @api
  questionprompt;
  @api
  checkGroupOptions;

  connectedCallback() {
    if (!this.checkGroupOptions) {
      return null;
    }
    //this is to make sure the check group options is formatted correctly when displaying
    var options = this.checkGroupOptions;
    options = options.split("||");
    let optionsArray = [];
    for (let i = 0; i < options.length; i++) {
      let myObject = {
        label: `${options[i]}`,
        value: `${options[i]}`
      };
      optionsArray.push(myObject);
    }
    this.checkGroupOptions = optionsArray;
  }

  changeAnswer(event) {
    let tempAns = event.detail.value;
    let answerString = "";
    for (let i = 0; i < tempAns.length - 1; i++) {
      answerString += tempAns[i] + "||";
    }
    answerString += tempAns[tempAns.length - 1];
    this.answerChoices = answerString;
    return answerString;
  }

  @api
  answer() {
    return this.answerChoices;
  }
}
