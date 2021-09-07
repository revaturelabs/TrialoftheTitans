({
    FireCohortUpdate : function(component, event){
        // Fire UpdateCohortEvent, which will launch a method to update the currently selected cohort in QCHubHome
        // with the event's SelectedCohort parameter
        let cohort = event.getSource().get("v.value");
        let cohortUpdate = component.getEvent("UpdateCohortEvent");
        cohortUpdate.setParams({"SelectedCohort" : cohort});
        cohortUpdate.fire();
    }

})