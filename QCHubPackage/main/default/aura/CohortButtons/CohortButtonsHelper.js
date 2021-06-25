({
    FireCohortUpdate : function(component, cohort){
        let cohortUpdate = component.getEvent("UpdateCohortEvent");
        cohortUpdate.setParams({"SelectedCohort" : cohort});
        cohortUpdate.fire();
    }

})