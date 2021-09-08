({
    CreateInterview : function(component){
        // Make a callout to the server to create a new QC_Interview__c for this interview session
        // (required to obtain an ID, so that QC_Question_Answer__c's can be saved to the server each time
        // an answer is given to prevent data loss)
        
        let serverCall = component.get("c.CreateInterview");
      
        serverCall.setParams({  "heroId"  : component.get("v.Hero.Id"),
                                "heroName" : component.get("v.Hero.Name"),
                                "cohortId" : component.get("v.CohortId"),
                                "week"    : component.get("v.Week")});

        serverCall.setCallback(this, function(response){

            let state = response.getState();

            if (state === "SUCCESS"){
                let newInterview = response.getReturnValue();
                component.set("v.CurrentInterview", newInterview);

            }


            
        });

        $A.enqueueAction(serverCall);

    },

    InterviewInit: function(component){

        // prevents the creation of bum data
        //h.CreateInterview(component);
        
        let x = component.get("v.QuestionIndex");
        

        component.set('v.HeroAnswer.Score__c',0)
        component.set('v.HeroAnswer.Answer__c',null);
        //h.ChangeQuestion(component);
       
        //++x is currently unbounded, isnt causing issues but would want to restrict it
        component.set("v.QuestionIndex", ++x);
   
    },


    getQuestionDeck : function(component, IncomingQDeckList) {
      
        //data is a list of strings that are names of the question decks we want to pull in to questions
        let action = component.get('c.getQuestion');
            //VVV
       
        action.setParams({ Decks : IncomingQDeckList});
        
        // VVV remove this when we need to use a list of decks from interview start
        //action.setParams({ Decks : "Sample2"});
        
        action.setCallback(this, function (response) {
            
            let state = response.getState();

            if (state === "SUCCESS") {
                
                component.set('v.QuestionSet', this.scrambleList(response.getReturnValue()));
                this.ChangeQuestion(component,0);

            } else if (state === "ERROR") {
                let errors = response.getError();
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
           
            return OutputList;

    },

    // this doesnt work properly
    UploadData : function(component){

        
        let uploadCall = component.get('c.InsertQAData');
        //*
        uploadCall.setParams(   {"interviewId" : component.get("v.CurrentInterview.Id"),
                                "heroAnswerStr"  : JSON.stringify(component.get("v.HeroAnswer"))});
        //*/
        uploadCall.setCallback(this, function(response){
           
            let state = response.getState();
           
            if (state === "SUCCESS"){
                this.ChangeQuestion(component,0);
            }
            
            else if (state === "INCOMPLETE"){
                console.log(state);
                
            }

            else if (state === "ERROR"){
                console.log(state);
                let errors = response.getError();

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

        let QAListEvent = component.getEvent("UpdateQAListEvent");
        QAListEvent.setParams({"QA" : component.get("v.HeroAnswer")});
        QAListEvent.fire();
    },

    
    ChangeQuestion: function(component){

        console.log(JSON.parse(JSON.stringify(component.get('v.QuestionSet'))) );
        component.set('v.HeroAnswer.Question__c',component.get('v.QuestionSet')[component.get("v.QuestionIndex")][0].Question_Body__c);
    },


    LaunchStageEvent : function(component, stage){

        let StageEvent = component.getEvent("UpdateStageEvent");
        StageEvent.setParams({"StageName" : stage});
        StageEvent.fire();
    }, 

    addOneToScore: function (component) {
        let x = component.get('v.HeroAnswer.Score__c');
        component.set('v.HeroAnswer.Score__c', ++x);
    },

    subtractOneFromScore: function (component) {
        let x = component.get('v.HeroAnswer.Score__c');
        if(x > 0) {
            component.set('v.HeroAnswer.Score__c', --x);
        }   
    }









})