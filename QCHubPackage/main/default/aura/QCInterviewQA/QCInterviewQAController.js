({
    /*
    OnRender : function(component, event, helper) {
        let questionBox = component.find("QuestionBox");
        let question = component.get("v.CurrentQuestion.Question__c")
        questionBox.focus();
        questionBox.setRangeText(question);
    },
    */
    
    /*
	UpdateHeroAnswer : function(component, event, helper) {
        let input = event.getSource().get("v.value");
        component.set("v.HeroAnswer.Question__c", input);
        //component.set("v.TEST", input);
	},
    */

    OnInit : function(component, event, helper){
        console.log("QCInterviewQA Init:");
        
        //cmp.set("v.CurrentQuestionIndex",0);
                                       // VVV this needs to be component.get("{!v.IncomingDeckList}"), which need to be set in interviewStart
        helper.getQuestionDeck(component,"Sample Question Deck", helper);
        
        helper.InterviewInit(component, helper);
    },
    

  

    TestQBox : function(cmp, event, helper) {
        //console.log("ahoy");
        
       helper.getQuestionDeck(cmp,"Sample Question Deck", helper);
       
    },

    SaveAndNext : function(component, event, helper){

        helper.UploadAnswer(component);
        
        // this call to interview init, should overwrite the interview attribute, this may interfer with the save due to scheduling 
        helper.InterviewInit(component, helper);
        // set the current question index forward 1 to get the next question (already randomized)

        //Not currently in use - only need it if we want to switch to uploading all data at the end of each interview
        /*
        helper.LaunchQAListEvent(component);
        */
    },

    FinishInterview : function(component, event, helper){

        helper.LaunchStageEvent(component, "End");

    },

    RetriveScore: function(component, event){
        console.log("ahoy")
		console.log(event.getParam("ScoreToTransfer"));
		component.set("v.HeroAnswer.Score__c", event.getParam("ScoreToTransfer"));

	},

    PlusClick: function(cmp){

        let x = cmp.get('v.HeroScore')
        cmp.set('v.HeroScore', ++x)
       
    },

    MinusClick: function(cmp){

        let x = cmp.get('v.HeroScore')
        if(x > 0)
            cmp.set('v.HeroScore', --x)
        
    },
    

})