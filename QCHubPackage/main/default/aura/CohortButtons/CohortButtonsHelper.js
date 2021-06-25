({
    FireCohortUpdate : function(component, cohort){
        let cohortUpdate = component.getEvent("UpdateCohortEvent");
        cohortUpdate.setParams({"SelectedCohort" : cohort});
        console.log("FIRING EVENT WITH " + cohort);
        cohortUpdate.fire();
    }

})