({
    CreateInterview : function(component){
        // Make a callout to the server to create a new QC_Interview__c for this interview session
        // (required to obtain an ID, so that QC_Question_Answer__c's can be saved to the server each time
        // an answer is given to prevent data loss)
        console.log("QCInterviewQAHelperInit");
        let serverCall = component.get("c.CreateInterview");
        console.log("QCInterviewQAHelper action defined");
        console.log("hero id: " + component.get("v.Hero.Id"));
        console.log("cohort id: " + component.get("v.CohortId"));

        serverCall.setParams({  "heroId"  : component.get("v.Hero.Id"),
                                "heroName" : component.get("v.Hero.Name"),
                                "cohortId" : component.get("v.CohortId"),
                                "week"    : component.get("v.Week")});

        serverCall.setCallback(this, function(response){

            let state = response.getState();

            if (state == "SUCCESS"){
                console.log(state);
                var newInterview = response.getReturnValue();
                component.set("v.CurrentInterview", newInterview);

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

        $A.enqueueAction(serverCall);

    },


    getQuestionDeck : function(cmp, data, helper) {
      

        var action = cmp.get('c.getQuestion');
        action.setParams({ Decks : data});
        action.setCallback(this, function (response) {
            
            var state = response.getState();

            if (state === "SUCCESS") {
                
                //console.log(response.getReturnValue());
                //cmp.set('v.HeroAnswer.Question__c', response.getReturnValue()[0].Question_Body__c);
                cmp.set('v.HeroAnswer.Question__c', helper.scrambleList(response.getReturnValue())[0][0].Question_Body__c);
                //return helper.scrambleList(response.getReturnValue());
                //return response.getReturnValue();

            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        
        $A.enqueueAction(action);


    },


    scrambleList : function(InputList){
        
        let OutputList = [];
        let values = Object.values(InputList);
        //console.log(InputList);
            //*
            for(let x in InputList){


                OutputList.push(values.splice(Math.floor(Math.random() * values.length), 1));
                 
            }
            //*/
            //console.log(OutputList);
            return OutputList;

    },


    UploadData : function(component){

        let uploadCall = component.get("c.InsertQAData");
        uploadCall.setParams(   {"interviewId" : component.get("v.CurrentInterview.Id")},
                                {"heroAnswer"  : JSON.stringify(component.get("v.HeroAnswer"))});
        
        uploadCall.setCallback(this, function(response){

            let state = response.getState();

            if (state == "SUCCESS"){
                console.log(state);

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

    },

    // ***CURRENTLY NOT IN USE***
    // Required only if we want to upload interview data at the end, rather than per-question
    LaunchQAListEvent : function(component){

        let QAListEvent = component.getEvent("UpdateQAListEvent");
        QAListEvent.setParams({"QA" : component.get("v.HeroAnswer")});
        QAListEvent.fire();
    
    },


    LaunchStageEvent : function(component, stage){

        let StageEvent = component.getEvent("UpdateStageEvent");
        StageEvent.setParams({"StageName" : stage});
        StageEvent.fire();

    }







})