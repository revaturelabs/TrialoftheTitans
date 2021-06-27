({
	OnInit : function(component, event, handler){
		// Set cohort to be interviewed with information stored in sessionStorage, set from QCHubHome
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
		console.log("QCINTERVIEWCONTROLLER: STAGE SET TO ");
		console.log(event.getParam("StageName"));
		component.set("v.Stage", event.getParam("StageName"));

	},


	QAEvent : function(component, event, handler){

		let questionAnswer = event.getParam("QA");
		helper.AddQuestionAnswer(component, questionAnswer);

	},


	SetHero : function(component, event, handler){
		console.log("HANDLING STARTINTERVIEWEVENT IN QCINTERVIEWCONTROLLER");
		let test = event.getParam("SelectedHero");
		console.log("TEST VARIABLE SET");
		console.log(test);
		console.log("SETHERO: SETTING HERO WITH " + test.Name);
		component.set("v.CurrentHero", event.getParam("SelectedHero"));
	}
})