/////////////////////////////////////////////////////
//
//  Name: ExamStatsHelper.js
//  Author: David Serrano
//  Description: Javascript helper to handle logic for data passed in through event
//
///////////////////////////////////////////////////


({
    // DisplayStats(): helps display the information related to an exam clicked on by the user
    // There are 3 different views that are possible, all depending on the assigned and isPassed variables
    // component: helps set data on the display
    // event: allows the event parameter containing the exam information to be passed through
    DisplayStats : function( component, event) {
        console.log("displayresults: " + JSON.stringify(event.getParam("exam")));
        let exam = event.getParam("exam");
        console.log("exam assigned? " + exam.assigned);
        component.set("v.exam", exam);

        //todo: change below conditional statement to exam.assigned == false
        if(exam.assigned == true){
            component.set("v.assigned", false);
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
    
                component.set("v.correctAnswers", correct);
                component.set("v.totalAnswers", total);
                component.set("v.score", score);
                component.set("v.assigned", true);
                component.set("v.attempted", true);
                component.set("v.display", true);
            } else{
                component.set("v.attempted", false);
                component.set("v.assigned", true);
            }

        }

    },


    // takeExamEvent(): Sets up the TakeExamClickedEvent.evt with the proper information.
    // Based on the exam, that was clicked for the above helper. Also set the takingExam to True
    takeExamEvent : function(component, event){
        let clickEvent = $A.get("e.c:TakeExamClickedEvent");
        let examId = component.get('v.exam')["currentResults"][0].Exam__c
        console.log('myexam ' + examId);
        clickEvent.setParams({
            "examId" : examId, 
            "takingExam" : true
        });
        clickEvent.fire();
    }
})