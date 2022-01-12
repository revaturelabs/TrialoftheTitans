({
    LaunchInterview : function(component) {
        let interviewEvent = component.getEvent("StartInterviewEvent");
        interviewEvent.setParams( { "SelectedHero" : component.get("v.Cohort.heroList[0]") } );
        interviewEvent.fire();
    },

    LaunchStageEvent : function(component, stage) {
        let StageEvent = component.getEvent("UpdateStageEvent");
        StageEvent.setParams({"StageName" : stage});
        StageEvent.fire();
    },

    LaunchWeekEvent : function(component) {
        let week = component.get("v.Week");
        let WeekEvent = component.getEvent("SetWeekEvent");
        WeekEvent.setParams({"Week" : week});
        WeekEvent.fire();
    },

    WeekSelect : function (component) {
        let week = component.find("WeekSelection").get("v.value");
        component.set("v.Week", week);
    }
})