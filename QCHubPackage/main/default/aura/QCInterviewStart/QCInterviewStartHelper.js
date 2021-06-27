({
    LaunchStageEvent : function(component, stage){
        let StageEvent = component.getEvent("UpdateStageEvent");
        StageEvent.setParams("StageName", stage);
        StageEvent.fire();
    }
})
