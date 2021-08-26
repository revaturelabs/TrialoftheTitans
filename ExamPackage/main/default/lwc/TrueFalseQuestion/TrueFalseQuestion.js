import { LightningElement,api } from "lwc";
export default class QuestionTableCmp extends LightningElement{
    /*<aura:attribute name="question" type="Exam_Question__c"/>
    <aura:attribute name="questionprompt" type="String"/>
    <aura:attribute name="correctAnswer" type="String"/>
    <aura:attribute name="options" type="List" default="[
    {'label': 'True', 'value': 'option1'},
    {'label': 'False', 'value': 'option2'}
    ]"/>*/
    @api question;
    @api questionprompt;
    @api correctAnswer;
    @api options;
    options=[
        {'label': 'True', 'value': 'option1'},
        {'label': 'False', 'value': 'option2'}
        ];
    @api option1;
    fetchTrueFalse(event) {
		return this.option1;
	}
    
}