/*
Author: Austin Ulberg, Daniel Boice
Date Modified: 1/1/1111
Description: Creates questions and allows users to submit to the server
*/

import { LightningElement,api, wire } from 'lwc';
import exam from '@salesforce/schema/Exam__c';
import titan from '@salesforce/schema/Titan__c';
import Question from '@salesforce/schema/Exam_Question__c';
import QuestionType from '@salesforce/schema/Exam_Question__c.Question_Type__c'
import getExam from '@salesforce/apex/ExamInterviewApexController.examFinder';

const FIELDS =[
    'Exam_Question__c.Question_Type__c',
    'Exam_Question__c.Id'
] 
export default class P3ExamInterView extends LightningElement {

exam;
titan;
titanName;

examQuestions;
examAnswers;

//Index for questions
questionNumber;
questionAmount;
questionsLoaded;
examId;
question;
questionType;
displayMatchingType;
displayShortType;
displayMultipleChoiceType;
displayMultiMultipleChoiceType;
displayTrueType;
displayNumberType;
displayEssayType;

   

    @wire(getExam, {examID: "$examId", fields: FIELDS})
    examQuestions;


    get question(){}
    set question(){}

    loadExamQuestions(){

    }
//Set Display values based on question type to conditionally render question type components

setDisplayBoolValues(){
    if(typeof question !='undefined'){
            
      
    
        switch (this.question.QuestionType) {
            case "Matching":
                this.displayMatchingType = true;
                this.displayShortType = false;
        this.displayMultipleChoiceType = false;
        this.displayMultiMultipleChoiceType = false;
        this.displayTrueType = false;
        this.displayNumberType = false;
        this.displayEssayType = false;

                break;

            case "Numerical":
            
                this.displayNumberType = true;
                this.displayMatchingType = false;
                this.displayShortType = false;
                this.displayMultipleChoiceType = false;
                this.displayMultiMultipleChoiceType = false;
                this.displayTrueType = false;
                this.displayEssayType = false;

                break;   
            case "Essay":
                if(! this.displayEssayType){
                this.displayEssayType = false;
                this.displayMatchingType = false;
                this.displayShortType = false;
                this.displayMultipleChoiceType = false;
                this.displayMultiMultipleChoiceType = false;
                this.displayTrueType = false;
                this.displayNumberType = false;
                }

                break;
            case "Short answer":
                if(!this.displayShortType){
                    this.displayShortType = true;
                    this.displayEssayType = false;
                    this.displayMatchingType = false;
                    this.displayMultipleChoiceType = false;
                    this.displayMultiMultipleChoiceType = false;
                    this.displayTrueType = false;
                    this.displayNumberType = false;
                    this.displayEssayType = true;
            }
                break;
            case "Multiple Choice":
                if(!this.displayMultipleChoiceType){
                    this.displayMultipleChoiceType = true;
                    this.displayEssayType = false;
                    this.displayMatchingType = false;
                    this.displayShortType = false;
                    this.displayMultiMultipleChoiceType = false;
                    this.displayTrueType = false;
                    this.displayNumberType = false;
                    this.displayEssayType = false;
                }
                break;
            case "Multiple Choice - multiple answers":
                if(!this.displayMultiMultipleChoiceType){
                    this.displayMultiMultipleChoiceType = true;
                    this.displayEssayType = false;
                    this.displayMatchingType = false;
                    this.displayShortType = false;
                    this.displayMultipleChoiceType = false;
                    this.displayTrueType = false;
                    this.displayNumberType = false;
                    this.displayEssayType = true;
                }
                break;
            case "True-false":
                if(!this.displayTrueType){
                    this.displayTrueType = true;
                    this.displayEssayType = false;
                    this.displayMatchingType = false;
                    this.displayShortType = false;
                    this.displayMultipleChoiceType = false;
                    this.displayMultiMultipleChoiceType = false;
                    this.displayNumberType = false;
                    this.displayEssayType = false;
                }
                break;                        
            default:
                break;
        }
}
        
    }
   
    prevClicked(){
        this.questionNumber--;
        this.question = this.examQuestions[this.questionNumber];
    }
    nextClicked(){
        this.questionNumber++;
        this.question = this.examQuestions[this.questionNumber];
    }
submitExam(){


}


}
