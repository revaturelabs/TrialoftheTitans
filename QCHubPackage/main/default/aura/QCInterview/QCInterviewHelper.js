({
	LoadSessionData : function(component, event) {
			// Set cohort to be interviewed with information stored in sessionStorage, set from QCHubHome
			console.log("QCInterview Init: ");

			let sessionCohort = sessionStorage.getItem('ActiveCohort');
			let sessionWeekList = sessionStorage.getItem('WeekList');
			console.log(sessionWeekList);
		
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
	
	UpdateStage : function(component, event){
		console.log("QCINTERVIEWCONTROLLER: STAGE SET TO ");
		console.log(event.getParam("StageName"));
		component.set("v.Stage", event.getParam("StageName"));
	},

	SetHero : function(component, event){
		console.log("HANDLING STARTINTERVIEWEVENT IN QCINTERVIEWCONTROLLER");
		let test = event.getParam("SelectedHero");
		console.log("TEST VARIABLE SET");
		console.log(test);
		console.log("SETHERO: SETTING HERO WITH " + test.Name);
		component.set("v.CurrentHero", event.getParam("SelectedHero"));
	},

	SetWeek : function(component, event){
		console.log("Handling Week Event");
		component.set("v.Week", event.getParam("Week"));
		console.log(event.getParam("Week"));
		console.log("Week set to: ");
		console.log(component.get("v.Week"));
	},

	AddQuestionAnswer : function(component, event){
		let questionAnswer = event.getParam("QA");
		let currentQAList = component.get("v.CurrentQAList");
		currentQAList.push(questionAnswer);
		component.set("v.CurrentQAList", currentQAList);
	
	}
})