({
    FireCohortUpdate(component, cohort){
        let cohortUpdate = component.getEvent("UpdateCohort");
        cohortUpdate.setParams("SelectedCohort", cohort)
        cohortUpdate.fire();
    }

})