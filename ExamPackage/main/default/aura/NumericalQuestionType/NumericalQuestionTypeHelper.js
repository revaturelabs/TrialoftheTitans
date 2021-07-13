({ 
    //Used this helper to make use of the controller that we used to test if the component
    //Actually pulled in information and displayed it correctly
    loadQuestionHelper : function(component) {

        var getQuestion = component.get("c.pullNumericalQuestions");

       /* getQuestion.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                var numerical = response.getReturnValue();

                component.set("v.question", numerical[2]);
                component.set("v.questionprompt", numerical[2].Question_Text__c);
            }

        });

        $A.enqueueAction(getQuestion);*/

    }
})
