({
    FireCohortUpdate : function(component, cohort){
        // Fire UpdateCohortEvent, which will launch a method to update the currently selected cohort in QCHubHome
        // with the event's SelectedCohort parameter
        let cohortUpdate = component.getEvent("UpdateCohortEvent");
        cohortUpdate.setParams({"SelectedCohort" : cohort});
        cohortUpdate.fire();
    }

})