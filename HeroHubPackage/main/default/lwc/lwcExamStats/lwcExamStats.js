import { LightningElement, api } from 'lwc';

export default class LwcExamStats extends LightningElement {
    @api
    exam

    @api
    totalAnswers

    @api
    correctAnswers

    @api
    score

    @api
    assigned

    @api
    attempted

    @api
    display

    examClicked(e){
        let exam = new CustomEvent("exam", {exam: this.exam});
        console.log("displayresults: " + JSON.stringify(exam));
        console.log("exam assigned? " + exam.assigned);
        this.exam = exam;

        //todo: change below conditional statement to exam.assigned == false
        if(exam.assigned == true){
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

                let score = (correct/total) * 100;
                score.toFixed(1);
                console.log("score: " + score);
    
                this.correctAnswers = correct;
                this.totalAnswers = total;
                this.score = score;
                this.assigned = true;
                this.attempted = true;
                this.display = true;
            } else{
                this.attempted = false;
                this.assigned = true;
            }

        }
    }

    takeExam(e){

    }

    get ifAssignedAttemptedFalse(){
        if((assigned == false) && (attempted == false)){
            return true;
        }
        return false;
    }

    get ifAssignedAttemptedTrue(){
        if(assigned && attempted){
            return true;
        }
        return false;
    }

    get ifAssignedTrueAttemptedFalse(){
        if(assigned && (attempted == false)){
            return true;
        }
        return false;
    }
}