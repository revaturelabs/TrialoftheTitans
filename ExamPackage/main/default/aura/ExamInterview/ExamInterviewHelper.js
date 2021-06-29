({
    //AssignExamHelper: Assigns the correct Exam that will be taken by the Hero
    //Gets this information from the TakeExamClickedEvent, which holds the Exam that will be taken
    assignExamHelper : function(component, event) {
        var exam = event.getParam("examId");
        //console.log(exam);
        component.set("v.examId", exam); 
    },

    loadExamHelper : function(component){
        var getExam = component.get("c.examFinder");
        var examId = component.get("v.examId");
        var cntr;
        var toggleClass;
        getExam.setParams(
            {"examID" : examId}
        );

        getExam.setCallback(this, function(respone){
            if(respone.getState() === "SUCCESS"){
                var exam = respone.getReturnValue();
                console.log(exam);
                component.set("v.examQuestions", exam);
                //var some = component.get("v.examQuestions")
                //console.log(some[0].Question_Text__c);
                cntr = 1;
               for(var i = 0; i < exam.length; i++){
                   if(i == 0){toggleClass = "toggle0"} else toggleClass = "toggle";
                   var question = exam[i];
                   console.log(question.Question_Text__c);
                    if(question.Question_Type__c === "Matching"){
                        $A.createComponents([
                            ["aura:html", {
                                "tag" : "div",
                                "HTMLAttributes":{"id": "Question" + cntr, "class" : toggleClass}
                            }],
                            ["c:MatchingQuestionType",
                            {"aura:id" : "Question " + cntr, 
                            "question" : question,
                            "options" : question.Options__c,
                            "answers" : question.Correct_Answer_s__c,
                            "questionprompt" : "Question " + cntr + " : " + question.Question_Text__c}]
                        ],
                            function(components, status, errorMessage){
                                if(status === "SUCCESS"){
                                    console.log(status)
                                    var body = component.get("v.body");
                                    var div  = components[0];
                                    var matchingCMP = components[1];
                                    div.set("v.body", matchingCMP);
                                    body.push(div);
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
                    if(question.Question_Type__c === "Numerical"){
                        $A.createComponents([
                            ["aura:html", {
                                "tag" : "div",
                                "HTMLAttributes":{"id": "Question" + cntr, "class" : toggleClass}
                            }], 
                            ["c:NumericalQuestionType" ,
                            {"aura:id" : "Question " + cntr,
                            "question" : question,
                            "questionprompt" : "Question " + cntr + " : " + question.Question_Text__c,
                            "answer" : question.Correct_Answer_s__c}]
                        ],

                            function(components, status, errorMessage){
                                if(status === "SUCCESS"){
                                    var body = component.get("v.body");
                                    var div  = components[0];
                                    var numericalCMP = components[1];
                                    div.set("v.body", numericalCMP);
                                    body.push(div);
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
                    if(question.Question_Type__c === "Essay"){
                        $A.createComponents([
                            ["aura:html", {
                                "tag" : "div",
                                "HTMLAttributes":{"id": "Question" + cntr, "class" : toggleClass}
                            }],
                            ["c:EssayTypeQuestion" ,
                            {"question" : question,
                            "aura:id" : "Question " + cntr,
                            "EssayQuestion" : "Question " + cntr + " : " + question.Question_Text__c,
                            "EssayAnswer" : question.Correct_Answer_s__c}]
                        ],

                            function(components, status, errorMessage){
                                if(status === "SUCCESS"){
                                    var body = component.get("v.body");
                                    var div = components[0];
                                    var essayCMP = components[1];
                                    div.set("v.body", essayCMP);
                                    body.push(div);
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
                    if(question.Question_Type__c === "Short answer"){
                        $A.createComponents([
                            ["aura:html", {
                                "tag" : "div",
                                "HTMLAttributes":{"id": "Question" + cntr , "class" : toggleClass}
                            }],
                            ["c:ShortAnswerTypeQuestion" ,
                            {"aura:id" : "Question " + cntr,
                            "question" : question,
                            "ShortQuestion" : "Question " + cntr + " : " + question.Question_Text__c,
                            "ShortAnswer" : question.Correct_Answer_s__c}]
                        ],

                            function(components, status, errorMessage){
                                if(status === "SUCCESS"){
                                    var body = component.get("v.body");
                                    var div = components[0];
                                    var shortAnswerCMP = components[1];
                                    div.set("v.body" , shortAnswerCMP)
                                    body.push(div);
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
                    if(question.Question_Type__c === "Multiple Choice"){
                        $A.createComponents([
                            ["aura:html", {
                                "tag" : "div",
                                "HTMLAttributes":{"id": "Question" + cntr , "class" : toggleClass}
                            }],
                            ["c:MultipleChoiceQuestion" ,
                            {"aura:id" : "Question " + cntr,
                            "question" : question,
                            "radioGroupOptions" : question.Options__c,
                            "questionprompt" : "Question " + cntr + " : " + question.Question_Text__c,
                            "correctAnswer" : question.Correct_Answer_s__c}]
                        ],

                            function(components, status, errorMessage){
                                if(status === "SUCCESS"){
                                    var body = component.get("v.body");
                                    var div = components[0];
                                    var multipleChoiceCMP = components[1];
                                    div.set("v.body" , multipleChoiceCMP);
                                    body.push(div);
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
                    if(question.Question_Type__c === "Multiple Choice - multiple answers"){
                        $A.createComponents([
                            ["aura:html", {
                                "tag" : "div",
                                "HTMLAttributes":{"id": "Question" + cntr , "class" : toggleClass}
                            }],
                            ["c:MultiMultipleChoicesQuestion",
                            {"aura:id" : "Question " + cntr,
                            "checkGroupOptions" : question.Options__c,
                            "question" : question,
                            "questionprompt" : "Question " + cntr + " : " + question.Question_Text__c,
                            "correctAnswer" : question.Correct_Answer_s__c}]
                        ],
                            function(components, status, errorMessage){
                                if(status === "SUCCESS"){
                                    var body = component.get("v.body");
                                    var div = components[0];
                                    var multiMultipleChoiceCMP = components[1];
                                    div.set("v.body", multiMultipleChoiceCMP);
                                    body.push(div);
                                    component.set("v.body", body);
                                }
                                else if(status === "INCOMPLETE"){
                                    console.log("No response from the server or client side.")
                                }
                                else if(status === "ERROR"){
                                    console.log("ERROR: " + errorMessage);
                                }
                            }
                        );
                        cntr++;
                    }
                    if(question.Question_Type__c === "True-false"){
                        $A.createComponents([
                            ["aura:html", {
                                "tag" : "div",
                                "HTMLAttributes":{"id": "Question" + cntr , "class" : toggleClass}
                            }],
                            ["c:TrueFalseQuestion", 
                            {"aura:id" : "Question " + cntr,
                            "question" : question,
                            "questionprompt" : "Question " + cntr + " : " + question.Question_Text__c,
                            "correctAnswer" : question.Correct_Answer_s__c}]
                        ],
                            function(components, status, errorMessage){
                                if(status === "SUCCESS"){
                                    var body = component.get("v.body");
                                    var div = components[0];
                                    var trueFalseCMP = components[1];
                                    div.set("v.body" , trueFalseCMP);
                                    body.push(div);
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
            component.set("v.questionAmount", exam.length);
        })
        $A.enqueueAction(getExam);
    } ,

    navigateToNextQuestionHelper : function(component){
        var questionNumber = component.get("v.questionNumber");
        var questionAmount = component.get("v.questionAmount");
        questionNumber++;
        var prev = component.find("prev");
        prev.set('v.disabled', false);
        var i = 1;
        while(i <= questionAmount){
            var toggleText = document.getElementById("Question" + i);
            if(i == questionNumber){
                toggleText.style.display = 'block';
            }else{
                toggleText.style.display = 'none';
            }
            i++;
        }
        if(questionNumber == questionAmount){
            var next = component.find("next");
            next.set('v.disabled', true);
            var submitB = document.getElementById("submitdiv");
            submitB.style.display = 'block';
        }

        component.set("v.questionNumber", questionNumber);
        //console.log(toggleText);
        //$A.util.toggleClass(toggleText, "toggle");
    },

    navigateToPrevQuestionHelper : function(component){
        var questionNumber = component.get("v.questionNumber");
        var questionAmount = component.get("v.questionAmount");
        if(questionNumber == questionAmount){
            var submitB = document.getElementById("submitdiv");
            submitB.style.display = 'none';
        }
        questionNumber--;
        var next = component.find("next");
        next.set('v.disabled', false);
        var i = questionAmount;

        while(i >= 1){
            var toggleText = document.getElementById("Question" + i);
            if(i == questionNumber){
                toggleText.style.display = 'block';
            }else{
                toggleText.style.display = 'none';
            }
            i--;
        }
        if(questionNumber == 1){
            var prev = component.find("prev");
            prev.set('v.disabled', true);
        }
        component.set("v.questionNumber", questionNumber);
    }
})
