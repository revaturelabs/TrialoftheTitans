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
        
       
                                       // VVV this needs to be component.get("{!v.IncomingDeckList}"), which need to be set in interviewStart
        let deckList = component.get("v.Week");
        console.log(deckList);
        helper.getQuestionDeck(component, deckList, helper);
        
        helper.InterviewInit(component, helper);
    },
    

  

    TestQBox : function(cmp, event, helper) {
        //console.log("ahoy");
        
       helper.getQuestionDeck(cmp,"Sample Question Deck", helper);
       
    },

    SaveAndNext : function(component, event, helper){

        console.log("SaveAndNext method activated");
        
        //helper.UploadData(component);
       
        helper.LaunchQAListEvent(component);
       
        // this call to interview init, should overwrite the interview attribute, this may interfer with the save due to scheduling 
        helper.InterviewInit(component, helper);
        helper.ChangeQuestion(component);
        component.set("v.HeroAnswer.Hero_Answer__c", '');
        
        // set the current question index forward 1 to get the next question (already randomized)
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

        let x = cmp.get('v.HeroAnswer.Score__c')
        cmp.set('v.HeroAnswer.Score__c', ++x)
       
    },
    // hero score is not bounded postivly can be increase to any number that fits in the test field
    MinusClick: function(cmp){

        let x = cmp.get('v.HeroAnswer.Score__c')
        if(x > 0)
            cmp.set('v.HeroAnswer.Score__c', --x)
        
    },
    

})