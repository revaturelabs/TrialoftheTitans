({
    OnInit : function(component, event, helper){

        helper.LoadCohorts(component);

    },

    UpdateCohort : function(component, event, helper){
        let selectedCohort = event.getSource().get("SelectedCohort");
        component.set("SelectedCohort", selectedCohort);
        component.set("NoCohortSelected", false);
    }
})
