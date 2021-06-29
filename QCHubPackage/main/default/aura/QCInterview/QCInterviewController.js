({
	OnInit : function(component, event, handler){
		// Set cohort to be interviewed with information stored in sessionStorage, set from QCHubHome
		console.log("QCInterview Init: ");
		let pageRef = component.get("v.pageReference");
		let sessionCohort = sessionStorage.getItem('ActiveCohort');
		let sessionWeekList = sessionStorage.getItem('WeekList');
		console.log(sessionWeekList);
		if(pageRef){
			component.set("v.CohortId", pageRef.state.c__CohortId);

		}
		console.log("Retrieving Session Variables;");
		if (sessionCohort){
			console.log("In session retrieve;");
			component.set("v.Cohort", JSON.parse(sessionCohort));
		}
		if (sessionWeekList){
			console.log("Cohort retrieved;");
			component.set("v.WeekList", JSON.parse(sessionWeekList));
		}
		console.log("QCInterview Init complete.")
		console.log("WeekList:");
		console.log(component.get("v.WeekList"));
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
	},


	SetWeek : function(component, event, handler){
		console.log("Handling Week Event");
		component.set("v.Week", event.getParam("Week"));
		console.log(event.getParam("Week"));
		console.log("Week set to: ");
		console.log(component.get("v.Week"));
	}
})