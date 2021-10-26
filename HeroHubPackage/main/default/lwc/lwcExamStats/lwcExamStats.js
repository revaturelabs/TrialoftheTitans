/*
    Author: Zabian Threatt
    Description: lcmExamStats helps display information on
        the exam depending on whether the exam has been
        attempted, assigned, or unavailable to take yet.
    Date Created: 10/17/21
*/

import { LightningElement, api } from 'lwc';
import Exam_Object from '@salesforce/schema/Exam__c';

export default class LwcExamStats extends LightningElement {
    @api totalAnswers;

    @api correctAnswers;

    @api assigned;

    @api attempted;

    @api display;

    @api score;

    get attemptDisplay() {
        return !this.assigned && !this.attempted;
    }

    get examDisplay() {
        return this.assigned && !this.attempted;
    }

    get resultsDisplay() {
        return this.assigned && this.attempted;
    }

    dispatchExamClicked = (event) => {
        const clickedExam = new CustomEvent('examClickedEvent');
        this.examClicked(event);

        this.dispatchEvent(clickedExam);
    }

    examClicked = (event) => {
        
        let exam = event.detail;
        console.log("displayresults: " + JSON.stringify(exam));
        console.log("exam assigned? " + exam.assigned);

        if(exam.assigned == false){
            this.assigned = false;
        }else{
            if(exam.highScore != null){
                let results = exam.currentResults[0];
                console.log("results:" + JSON.stringify(results));

                let correct = results.Total_Correct__c;
                console.log("correct: " + correct);

                console.log("results:" + JSON.stringify(results));

                let total = results.Total_Answers__c;
                console.log("total: " + total);

                let examScore = (correct/total) * 100;
                examScore.toFixed(1);
                console.log("score: " + examScore);
    
                this.correctAnswers = correct;
                this.totalAnswers = total;
                this.score = examScore;
                this.assigned = true;
                this.attempted = true;
                this.display = true;
            } else{
                this.attempted = false;
                this.assigned = true;
            }

        }
    }
}