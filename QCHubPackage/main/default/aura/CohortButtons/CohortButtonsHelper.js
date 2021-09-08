({
    FireCohortUpdate : function(component, event){
        let cohort = event.getSource().get("v.value");
        let cohortUpdate = component.getEvent("UpdateCohortEvent");
        cohortUpdate.setParams({"SelectedCohort" : cohort});
        cohortUpdate.fire();
    }
})