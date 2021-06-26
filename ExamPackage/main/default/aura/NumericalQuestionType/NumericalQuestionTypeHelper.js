({
    loadQuestionHelper : function(component) {

        var getQuestion = component.get("c.pullNumericalQuestions");

        getQuestion.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                var numerical = response.getReturnValue();

                component.set("v.question", numerical[2]);
                component.set("v.questionprompt", numerical[2].Question_Text__c);
            }

        });

        $A.enqueueAction(getQuestion);

    }
})
