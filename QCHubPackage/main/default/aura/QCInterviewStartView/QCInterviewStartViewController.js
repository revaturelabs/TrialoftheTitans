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
        helper.LaunchStageEvent(component, "Interview");
    }
})