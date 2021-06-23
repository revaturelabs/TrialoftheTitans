({
    getCohorts : function(component, event, helper) {

        helper.LoadCohorts(component, event);

    },

    SelectCohort : function(component, event, helper){

        let selectedCohort = event.getSource().get("value");
        helper.FireCohortUpdate(component, selectedCohort);

    }
})
