({
	LoadSessionData : function(component) {
			let myPageRef = component.get("v.pageReference");
			let sessionCohort = myPageRef.state.c__Cohort;
			component.set("v.Cohort", sessionCohort);
	},
	
	UpdateStage : function(component, event){
		component.set("v.Stage", event.getParam("StageName"));
	},

	SetHero : function(component, event){
		component.set("v.CurrentHero", event.getParam("SelectedHero"));
	},

	SetWeek : function(component, event){
		component.set("v.Week", event.getParam("Week"));
	},

	AddQuestionAnswer : function(component, event){
		let questionAnswer = event.getParam("QA");
		let currentQAList = component.get("v.CurrentQAList");
		currentQAList.push(questionAnswer);
		component.set("v.CurrentQAList", currentQAList);
	}
})