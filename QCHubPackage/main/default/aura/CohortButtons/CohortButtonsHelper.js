({
    loadCohorts : function(component, event) {
        // get the event from the button
        var btnClicked = event.getSource();

        // create a method to pull in all active cohorts currently in the org (SOQL) and iterrate over the list placing active cohorts into the list

        component.set("v.cohort");

  
    }
})
