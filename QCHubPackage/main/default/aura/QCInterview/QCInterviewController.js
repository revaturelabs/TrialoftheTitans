({
	OnInit : function(component, event, handler){
		let pageRef = component.get("v.pageReference");
		let session = sessionStorage.getItem('ActiveCohort');
		if(pageRef){
			component.set("v.CohortId", pageRef.state.c__CohortId);

		}
		if(session){
			component.set("v.Cohort", JSON.parse(session));

		}

	},


	UpdateStage : function(component, event, handler){

		component.set("v.Stage", event.getParam("StageName"))

	},


	QAEvent : function(component, event, handler){

		let questionAnswer = event.getParam("QA");
		helper.AddQuestionAnswer(component, questionAnswer);

	},


	SetHero : function(component, event, handler){

		component.set("v.CurrentHero", event.getParam("SelectedHero"));
	}
})