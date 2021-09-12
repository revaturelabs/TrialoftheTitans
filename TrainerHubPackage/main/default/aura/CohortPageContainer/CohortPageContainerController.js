/////////////////////////////////////////////////////
//
//  Name: CohortPageContainer
//  Author: Kameron Fincher
//  Description: Main controller for the cohort page main 
//	view.  
//	
///////////////////////////////////////////////////
({
	Init : function(component, event, helper) {
        console.debug("hello");
		helper.Init(component, event);
        helper.SetExamLink(component, event);
        helper.getCohorts(component);
	},
    ToExamHub : function(cmp, event, helper) {
        helper.ToExamHub(cmp, event);
    },
    HandleTabClick : function(component, event, helper) {
		helper.HandleTabClick(component, event);
	},
    CreateNewAssessment : function(component, event, helper) {
		helper.CreateNewAssessment(component, event);
	},
    HideNewAssessment : function(component, event, helper) {
		helper.HideNewAssessment(component, event);
	},
    HandleReturnAssessmentIdEvent : function(cmp, event, helper) {
    	helper.HandleReturnAssessmentIdEvent(cmp, event);
    },
    HandleReturnComponentEvent : function(cmp, event, helper) {
        helper.HandleReturnComponentEvent(cmp, event);
    },
    HandleReturnHeroComponentEvent : function(cmp, event, helper) {
        helper.HandleReturnHeroComponentEvent(cmp, event);
    },
    Chart : function(component, event, helper){
        helper.Chart(component, event);
        
    },
    ScriptsLoaded : function(component, event, helper){
        helper.ScriptsLoaded(component, event);
	},
    handleCohortChange : function(component, event, helper){
        helper.Init(component, event);
    },
    setCohort : function(component, event, helper){
        helper.setCohort(component, event);
    }
})