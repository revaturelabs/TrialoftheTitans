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

            if (state === "SUCCESS"){
                console.log(state);
                var newInterview = response.getReturnValue();
                component.set("v.CurrentInterview", newInterview);
                console.log("Interview retrieved;");

            }
            
            else if (state === "INCOMPLETE"){
                console.log(state);

            }

            else if (state === "ERROR"){
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

    InterviewInit: function(cmp,h){

        // prevents the creation of bum data
        //h.CreateInterview(cmp);
        
        let x = cmp.get("v.QuestionIndex");
        

        cmp.set('v.HeroAnswer.Score__c',0)
        cmp.set('v.HeroAnswer.Answer__c',null);
        //h.ChangeQuestion(cmp);
       
        //++x is currently unbounded, isnt causing issues but would want to restrict it
        cmp.set("v.QuestionIndex", ++x);
   
    },


    getQuestionDeck : function(cmp, IncomingQDeckList, helper) {
      
        //data is a list of strings that are names of the question decks we want to pull in to questions
        var action = cmp.get('c.getQuestion');
            //VVV
       
        action.setParams({ Decks : IncomingQDeckList});
        
        // VVV remove this when we need to use a list of decks from interview start
        //action.setParams({ Decks : "Sample2"});
        
        action.setCallback(this, function (response) {
            
            var state = response.getState();

            if (state === "SUCCESS") {
                
                //console.log(response.getReturnValue());
                //cmp.set('v.HeroAnswer.Question__c', response.getReturnValue()[0].Question_Body__c);
                cmp.set('v.QuestionSet', helper.scrambleList(response.getReturnValue()));
                helper.ChangeQuestion(cmp,0);
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
      
            for(let x in InputList){

                OutputList.push(values.splice(Math.floor(Math.random() * values.length), 1));    
            }
            //console.log(OutputList);
            return OutputList;

    },

    // this doesnt work properly
    UploadData : function(component){

        
        var uploadCall = component.get('c.InsertQAData');
        //*
        uploadCall.setParams(   {"interviewId" : component.get("v.CurrentInterview.Id"),
                                "heroAnswerStr"  : JSON.stringify(component.get("v.HeroAnswer"))});
        //*/
        uploadCall.setCallback(this, function(response){
            console.log("ahoy1");
            let state = response.getState();
            console.log("ahoy2" + state);
            if (state === "SUCCESS"){
                console.log("ahoy" + state);
                this.ChangeQuestion(component,0);
            }
            
            else if (state === "INCOMPLETE"){
                console.log(state);
                
            }

            else if (state === "ERROR"){
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

    // ***CURRENTLY IN USE***
    // Required only if we want to upload interview data at the end, rather than per-question
    LaunchQAListEvent : function(component){

        //console.log(JSON.stringify(component.get("v.HeroAnswer")));
        
        let QAListEvent = component.getEvent("UpdateQAListEvent");
        QAListEvent.setParams({"QA" : component.get("v.HeroAnswer")});
        QAListEvent.fire();
        
        
    
    },

    
    ChangeQuestion: function(cmp){
        console.log(cmp.get("v.QuestionIndex"));
        cmp.set('v.HeroAnswer.Question__c',cmp.get('v.QuestionSet')[cmp.get("v.QuestionIndex")][0].Question_Body__c);
    },


    LaunchStageEvent : function(component, stage){

        let StageEvent = component.getEvent("UpdateStageEvent");
        StageEvent.setParams({"StageName" : stage});
        StageEvent.fire();

    }







})