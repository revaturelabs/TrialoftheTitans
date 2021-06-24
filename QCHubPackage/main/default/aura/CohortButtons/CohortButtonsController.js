({
    getCohorts : function(component, event, helper) {

        helper.LoadCohorts(component, event);

    },

    SelectCohort : function(component, event, helper){
        console.log(component.get("v.CohortList[0]"));
        console.log("BUTTON CLICK");
        let selectedCohort = event.getSource().get("v.value");
        console.log("SELECTCOHORT_COHORTBUTTONSCONTROLLER: ");
        console.log(selectedCohort);
        helper.FireCohortUpdate(component, selectedCohort);

    }
})