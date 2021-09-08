({
	LoadSessionData : function(component) {
			let sessionCohort = sessionStorage.getItem('ActiveCohort');
			let sessionWeekList = sessionStorage.getItem('WeekList');

			if (sessionCohort){
				component.set("v.Cohort", JSON.parse(sessionCohort));
			}
			if (sessionWeekList){
				component.set("v.WeekList", JSON.parse(sessionWeekList));
			}
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