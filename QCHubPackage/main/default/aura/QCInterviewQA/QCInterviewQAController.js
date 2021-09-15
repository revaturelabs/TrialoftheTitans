({
        
    OnInit : function(component, event, helper){

       
                                       // VVV this needs to be component.get("{!v.IncomingDeckList}"), which need to be set in interviewStart
        helper.getQuestionDeck(component,"Sample Question Deck", helper);

        
        helper.InterviewInit(component, helper);
    },
    

  

    TestQBox : function(component, event, helper) {
                
       helper.getQuestionDeck(component,"Sample Question Deck");
    },

    SaveAndNext : function(component, event, helper){
                
        helper.LaunchQAListEvent(component);
       
        // this call to interview init, should overwrite the interview attribute, this may interfer with the save due to scheduling 
        helper.InterviewInit(component, helper);
        helper.ChangeQuestion(component)
        // set the current question index forward 1 to get the next question (already randomized)
    },

    FinishInterview : function(component, event, helper){

        helper.LaunchStageEvent(component, "End");
    },

    RetriveScore: function(component, event){
       		
	    component.set("v.HeroAnswer.Score__c", event.getParam("ScoreToTransfer"));
	},

    PlusClick: function(component, event, helper){
        
        helper.addOneToScore(component);
    },
    // hero score is not bounded postivly can be increase to any number that fits in the test field
    MinusClick: function(component, event, helper){
        //subtract 1 from score  
        helper.subtractOneFromScore(component);
   },
    

})