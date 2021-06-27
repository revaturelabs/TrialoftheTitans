({
    TESTNEXT : function(component, event, helper){

        let interviewEvent = component.getEvent("StartInterviewEvent");
        interviewEvent.setParams("SelectedHero", component.get("v.Cohort.squadList[0].heroes[0]"));
        interviewEvent.fire();
        helper.LaunchStageEvent(component, "Interview");
    
    }
})
