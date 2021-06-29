({
    TESTNEXT : function(component, event, helper){

        console.log("QCINTERVIEWSTART: NEXT BUTTON PRESSED");

        let interviewEvent = component.getEvent("StartInterviewEvent");
        console.log("QCINTERVIEWSTART: EVENT RETRIEVED");

        interviewEvent.setParams( { "SelectedHero" : component.get("v.Cohort.heroList[0]") } );
        console.log("QCINTERVIEWSTART: SELECTEDHERO PARAMETER SET with" + component.get("v.Cohort.heroList[0].Name"));
        console.log(component.get("v.Cohort.heroList[0].Id"));

        interviewEvent.fire();
        console.log("QCINTERVIEWSTART: INTERVIEWEVENT FIRED");

        helper.LaunchStageEvent(component, "Interview");
        console.log("QCINTERVIEWSTART: STAGE EVENT LAUNCHED");
    
    },


    StartInterview : function(component, event, helper){

        helper.LaunchWeekEvent(component, component.get("v.Week"));
        helper.LaunchStageEvent(component, "Interview");

    },


    WeekSelect : function(component, event, handler){
        
        console.log("SET WEEK: ");
        console.log(component.find("WeekSelection").get("v.value"));
		let week = component.find("WeekSelection").get("v.value");
        console.log("SET");
        console.log(week);
        component.set("v.Week", week);

	}
})