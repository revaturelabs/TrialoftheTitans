({
    LaunchStageEvent : function(component, stage){
        let StageEvent = component.getEvent("UpdateStageEvent");
        console.log("HELPER.LAUNCHSTAGEEVENT: SENDING STAGE EVENT WITH " + stage);
        StageEvent.setParams({"StageName" : stage});
        StageEvent.fire();
    },

    LaunchWeekEvent : function(component, week){
        let WeekEvent = component.getEvent("SetWeekEvent");
        WeekEvent.setParams({"Week" : week});
        console.log("Fired week event with:");
        console.log(week);
        WeekEvent.fire();
    }
})