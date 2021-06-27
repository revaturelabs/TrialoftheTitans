({
    LaunchStageEvent : function(component, stage){
        let StageEvent = component.getEvent("UpdateStageEvent");
        console.log("HELPER.LAUNCHSTAGEEVENT: SENDING STAGE EVENT WITH " + stage);
        StageEvent.setParams({"StageName" : stage});
        StageEvent.fire();
    }
})
