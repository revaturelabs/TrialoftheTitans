({
    SelectCohort : function(component, event, helper){
        
        let selectedCohort = event.getSource().get("v.value");
        helper.FireCohortUpdate(component, selectedCohort);

    }
})