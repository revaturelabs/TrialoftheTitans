({
    DisplayStats : function( component, event) {
        console.log("displayresults:" + JSON.stringify(event.getParam("exam")));
        let exam = event.getParam("exam");

        component.set("v.exam", exam.name);

        if(exam.assigned == false){
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

    }
})
