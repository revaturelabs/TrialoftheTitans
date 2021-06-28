({
    getData : function(component, event, helper){
        let action = component.get("c.getQuestionDeckAndQuestions");
        action.setParams({
            weekName : component.get("v.weekName")
        });
        action.setCallback(this, function(response){

            let state = response.getState();
            console.log(state);
            if (state == "SUCCESS"){
                
                var data = response.getReturnValue();
                console.log("### data = "+JSON.stringify(data));
                component.set("v.questionDeck", data); 
               
            }
            
            else if (state == "INCOMPLETE"){
                console.log(state);

            }

            else if (state == "ERROR"){
                console.log(state);
                var errors = response.getError();

                if (errors) {
                    if (errors[0] && errors[0].message){
                        console.log("Error message: " + errors[0].message);

                    }

                }
                else {
                    console.log("Unknown error");

                }

            }

        });

        $A.enqueueAction(action);
    },

    setQuestionDeck : function(component, event, helper){
        var allQuestionDeckWithQuestions = component.get("v.allQuestionDeckWithQuestions");
        var weekName = component.get("v.weekName");
        for(var obj in allQuestionDeckWithQuestions){            
            if(weekName == obj.Week__c){
                console.log("### heroMap = "+ JSON.stringify(allQuestionDeckWithQuestions));
                component.set("v.questionDeck", obj);
            }
        }

    },

    submitAnswer : function(component, event, helper){
        let action = component.get("c.submitTheAnswer");
        
        var question = event.getSource().get("v.value");
        var qcInterviewId = component.get("v.qcInterviewId");
        var answer = component.get("v.answer");
        var score = component.get("v.score");
        
        console.log("#### question = "+ question);
        console.log("#### qcInterviewId = "+ qcInterviewId);
        console.log("#### answer = "+ answer);
        action.setParams({
            qcInterviewId : qcInterviewId,
            answer : answer,
            question : question,
            score : score
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            console.log(state);
            if (state == "SUCCESS"){       
               
            }
            
            else if (state == "INCOMPLETE"){
                console.log(state);
            }

            else if (state == "ERROR"){
                console.log(state);
                var errors = response.getError();

                if (errors) {
                    if (errors[0] && errors[0].message){
                        console.log("Error message: " + errors[0].message);
                    }
                }
                else {
                    console.log("Unknown error");
                }
            }
        });

        $A.enqueueAction(action);
    }
})