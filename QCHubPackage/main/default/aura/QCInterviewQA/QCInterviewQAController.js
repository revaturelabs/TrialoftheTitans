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
    
    TestQBox : function(component, event, helper) {
        console.log(component.get("v.HeroAnswer.Question__c"));
    }
})