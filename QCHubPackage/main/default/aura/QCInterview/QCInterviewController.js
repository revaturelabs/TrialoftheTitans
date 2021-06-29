({
	OnInit : function(component, event, handler){
		// Set cohort to be interviewed with information stored in sessionStorage, set from QCHubHome
		console.log("QCInterview Init: ");
		let pageRef = component.get("v.pageReference");
		let sessionCohort = sessionStorage.getItem('ActiveCohort');
		let sessionWeekList = sessionStorage.getItem('WeekList');
		if(pageRef){
			component.set("v.CohortId", pageRef.state.c__CohortId);

		}
		console.log("Retrieving Session Variables;");
		if(session){
			console.log(JSON.parse(sessionWeekList));
			component.set("v.Cohort", JSON.parse(sessionCohort));
			component.set("v.Week", JSON.parse(sessionWeekList));
		}
		console.log("QCInterview Init complete.")
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