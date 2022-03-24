/*
 * @description       : Creates Pop Up Modal that sends a message based on exam result.
 * @author            : Austin Ulberg, Daniel Boice, Zain Hamid, Conner Eilenfeldt
 * @group             :
 * @last modified on  : 03-23-2022
 * @last modified by  : Mushfiq Chaudry
 * Modifications Log
 * Ver   Date         Author                Modification
 * 1.0   09-30-2021   Daniel Boice          Initial Version
 * 1.1   02-11-2022   Zain Hamid            Question randomization
 * 1.2   02-14-2022   Zain Hamid            Question state tracking
 * 1.3   02-15-2022   Conner Eilenfeldt     Submission confirmation message
 * 1.4   02-17-2022   Conner Eilenfeldt     Exam details header
 * 1.5   02-18-2022   Conner Eilenfeldt     Added exam timer
 
 * 1.6   03-23-2022   Mushfiq Chaudry       Access/Retrieve Modal
                      Eli Couture           Calculate Pass/Fail
                      Michael Siripongpibul Calculate Exam Scores  
                      Patrick Sepnio        Question/Answer Tracking
 **/



import { LightningElement, api, track } from 'lwc';

export default class LwcPopupModal extends LightningElement {

    // Boolean value used in showing/closing modal component.
    @track isModalOpenTwo = false;

    // Lists of all the questions in the Question Bank.
    @track questionList;

    //Lists all the answers from user input.
    @track answerList;

    @track passingGradeOverride;
    @track defaultPassingGrade;

    @track counter = 0;
    @track result = 0;
    @track filler = 0;

    @track calculatedGrade = false;



    @api setQuestionAnswer(inQl, inAl, inPgo, inDpg){

        this.questionList = inQl;
        this.answerList =inAl;
        this.passingGradeOverride = inPgo;
        this.defaultPassingGrade = inDpg;
        

        console.log("popUp Modal set questionAnswer");

        for(const question of this.questionList){
            console.log(question);
            console.log(question.Correct_Answer_s__c);
        }
        for(const question of this.answerList){
            console.log(question);
        }             
        for(let i=0; i < this.questionList.length; i++){
            if(this.questionList[i] && this.answerList[i+1]){ 
                // Answers are not in random ordered and this worked. If you randomize, it will NOT work.
                
                console.log(this.questionList[i].Correct_Answer_s__c.substring(0,1) === this.answerList[i+1].substring(0,1));
                if(this.questionList[i].Correct_Answer_s__c.substring(0,1) === this.answerList[i+1].substring(0,1)){
                this.counter++;
                console.log(this.counter);
            }   
        } 
        }
        this.result = (this.counter/this.questionList.length) * 100;
        this.result = Math.round((this.result + Number.EPSILON) * 100) / 100;
        console.log(this.result);

        if(this.passingGradeOverride){ 

            if(this.result >= this.passingGradeOverride){
                console.log("You Passed");
                this.calculatedGrade = this.result;
            }
            else{
                console.log("You Failed. Your Mom is Sad!");
            }
        }
        else if(this.defaultPassingGrade){
            if(this.result >= this.defaultPassingGrade){ 

                console.log("You Passed with Flying Color");
                this.calculatedGrade = this.result;
            } 
            else{
                console.log("You Failed. Your Mom is VERY Sad!");
            } 

            this.sum =  Math.round((this.sum + Number.EPSILON) * 100) / 100;

        }
        else{
            if(this.result >= 65){
                console.log("You Passed with 65 or Above");
                this.calculatedGrade = this.result;
            }
            else{
                console.log("You Failed. Your Mom is VERY VERY Sad!");
            } 
        }

        

       






        console.log(this.passingGradeOverride);
        console.log(this.defaultPassingGrade);
        console.log(Object.values(this.passingGradeOverride));  
        

        
    }


    @api showModalTwo(){
        this.isModalOpenTwo = true;
    }

    @api closeModalTwo(){
        this.isModalOpenTwo = false;
    }  
    
    



    handleClick(event){
    }

    get modalClassTwo() {
        return `slds-modal ${this.isModalOpenTwo ? "slds-fade-in-open" : ""}`;
      }

      get modalBackdropClassTwo() {
        return `slds-backdrop ${this.isModalOpenTwo ? "slds-backdrop_open" : ""}`;
      }



    
}