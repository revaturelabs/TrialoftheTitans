({
    //AssignExamHelper: Assigns the correct Exam that will be taken by the Hero
    //Gets this information from the TakeExamClickedEvent, which holds the Exam that will be taken
    assignExamHelper : function(component, event) {
        var exam = event.getParam("event");
        //console.log(exam);
        component.set("v.examId", exam); 
    },

    loadExamHelper : function(component){
        var getExam = component.get("c.examFinder");
        var examId = component.get("v.examId");
        getExam.setParams(
            {"examID" : examId}
        );

        getExam.setCallback(this, function(respone){
            if(respone.getState() === "SUCCESS"){
                var exam = respone.getReturnValue();
                console.log(exam);
                component.set("v.examQuestions", exam);
                var cntr = 1;
               for(var question of exam){
                   //console.log(question.Question_Text__c);
                    if(question.Question_Type__c === "Matching"){
                        $A.createComponent(
                            "c:MatchingQuestionType",
                            {"question" : question,
                            "options" : question.Options__c,
                            "answers" : question.Correct_Answer_s__c,
                            "questionprompt" : "Question " + cntr + " : " + question.Question_Text__c}
                            ,
                            function(matchingCMP, status, errorMessage){
                                if(status === "SUCCESS"){
                                    console.log(status);
                                    var body = component.get("v.body");
                                    body.push(matchingCMP);
                                    component.set("v.body", body);
                                }
                                else if(status === "INCOMPLETE"){
                                    console.log("No response from the server or client side.")
                                }
                                else if(status === "ERROR"){
                                    console.log("ERROR: " + errorMessage);
                                }
                            }
                        )
                        cntr++;
                    }
                    else if(question.Question_Type__c === "Numerical"){
                        $A.createComponent(
                            "c:NumericalQuestionType" ,
                            {"question" : question,
                            "questionprompt" : "Question " + cntr + " : " + question.Question_Text__c,
                            "answer" : question.Correct_Answer_s__c},

                            function(numericalCMP, status, errorMessage){
                                if(status === "SUCCESS"){
                                    var body = component.get("v.body");
                                    body.push(numericalCMP);
                                    component.set("v.body", body);
                                }
                                else if(status === "INCOMPLETE"){
                                    console.log("No response from the server or client side.")
                                }
                                else if(status === "ERROR"){
                                    console.log("ERROR: " + errorMessage);
                                }
                            }

                        )
                        cntr++;
                    }
                }
            }
        })

        $A.enqueueAction(getExam);
    }
})
