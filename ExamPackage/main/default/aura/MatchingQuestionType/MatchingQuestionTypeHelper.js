({
    searchQuestionHelper : function(component) {
        /*
        var eachQuestion = component.get("v.question");
        var options = component.get("v.options");
        var answers = component.get("v.answers");*/
        var searching = component.get("c.pullMatchingQuestions");
        searching.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                var matching = response.getReturnValue();

                var optionsList = matching[1].Options__c.split("||");
                var answersList = matching[1].Correct_Answer_s__c.split("||");
                optionsList.unshift("Select Answer....");
                component.set("v.questionprompt", matching[1].Question_Text__c);
                component.set("v.options", optionsList);

                for(var a of answersList){
                    $A.createComponent(
                        "lightning:select", {"aura:id" : "answers", "label" : a, "value" : a}
                    ,
                        function(newSelect, status, errorMessage){
                            if(status === "SUCCESS"){
                                var body = component.get("v.body");
                                body.push(newSelect);
                                component.set("v.body", body);
                                newSelect.set("v.body", component.find("iterator"));
                                
                            }
                            else if(status === "INCOMPLETE"){
                                console.log("No response from the server or client side.")
                            }
                            else if(status === "ERROR"){
                                console.log("ERROR: " + errorMessage);
                            }

                        }
                    );
                }
            }

        });
        $A.enqueueAction(searching);
    }
})
