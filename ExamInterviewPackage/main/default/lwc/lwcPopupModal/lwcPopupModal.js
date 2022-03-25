/*
 * @description       : Creates Pop Up Modal that sends a message based on exam result.
 * @author            : Patrick Sepnio, Eli Couture, Mushfiqus Chaudhury, Michael Siripongpibul
 * @group             :
 * @last modified on  : 03-23-2022
 * @last modified by  : Mushfiq Chaudry
 * Modifications Log
 * Ver   Date         Author                Modification
 * 1.0   03-23-2022   Mushfiqus Chaudhury   Access/Retrieve Modal
 

 **/



import { LightningElement, api, track } from 'lwc';

export default class LwcPopupModal extends LightningElement {

    // Boolean value used in showing/closing modal component.
    @track isModalOpenTwo = false;

    // Lists of all the questions in the Question Bank.
    @track questionList;

    //Lists all the answers from user input.
    @track answerList;

    //passingGradeOverride is from Exam_Result__c -iteration xi
    @track passingGradeOverride;
    @track defaultPassingGrade; //defaultPassingGrade is from Exam__c and is from lookup on Exam_Result__c -iteration xi
    passOrFail='';

    //counter is amount of correct questions -iteration xi
    @track counter = 0;
    @track result = 0; //result is calculated (correct/total questions) is % 0-100- iteration xi


    @track calculatedGrade = false;


    //call from the parent, gets the question and answer list then assigns them to reactive field LWC
    //also caculates pass/fail and comparing it to those thresholds
    @api setQuestionAnswer(inQl, inAl, inPgo, inDpg){

        this.questionList = inQl;
        this.answerList =inAl;
        this.passingGradeOverride = inPgo;
        this.defaultPassingGrade = inDpg;
        

        console.log("popUp Modal set questionAnswer");

        //displaying the test values
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
                
                //console.log(this.questionList[i].Correct_Answer_s__c.substring(0,1) === this.answerList[i+1].substring(0,1));
                if(this.questionList[i].Correct_Answer_s__c.substring(0,1) === this.answerList[i+1].substring(0,1)){
                this.counter++;
                console.log(this.counter);
            }   
        } 
        }
        this.result = (this.counter/this.questionList.length) * 100;
        this.result = Math.round((this.result + Number.EPSILON) * 100) / 100;
        console.log(this.result);

        //checks to see if the calculated grade is greater than or equal to the passing grade override -iteration xi
        if(this.passingGradeOverride){ 

            if(this.result >= this.passingGradeOverride){
                console.log("You Passed");
                this.calculatedGrade = this.result;
                this.passOrFail='PASSED';
                
            }
            else{
                console.log("You Failed. Your Mom is Sad!");
                this.passOrFail='FAILED';
                
            }
        }
        //same as above if statement but if the passingGradeOverride does not exist, then it will use the default passing grade- iteration xi
        else if(this.defaultPassingGrade){
            if(this.result >= this.defaultPassingGrade){ 

                console.log("You Passed with Flying Color");
                this.calculatedGrade = this.result;
                this.passOrFail='PASSED';
                
            } 
            else{
                console.log("You Failed. Your Mom is VERY Sad!");
                this.passOrFail='FAILED';
            } 

           

        }
        //if there is neither the defaultPassingGrade or passingGradeOverride, then compare the calculated score to 65 percent -iteration xi
        else{
            if(this.result >= 65){
                console.log("You Passed with 65 or Above");
                this.calculatedGrade = this.result;
                this.passOrFail='PASSED';
                
            }
            else{
                console.log("You Failed. Your Mom is VERY VERY Sad!");
                this.passOrFail='FAILED';
                
            } 
        }
        // console.log(this.passingGradeOverride);
        // console.log(this.defaultPassingGrade);
        // console.log(Object.values(this.passingGradeOverride));  
        

        
    }

    //called by parent to open or close modal -iteration xi
    @api showModalTwo(){
        this.isModalOpenTwo = true;
    }

    @api closeModalTwo(){
        this.isModalOpenTwo = false;
    }  
    
    

    get modalClassTwo() {
        return `slds-modal ${this.isModalOpenTwo ? "slds-fade-in-open" : ""}`;
      }

      get modalBackdropClassTwo() {
        return `slds-backdrop ${this.isModalOpenTwo ? "slds-backdrop_open" : ""}`;
      }



    
}