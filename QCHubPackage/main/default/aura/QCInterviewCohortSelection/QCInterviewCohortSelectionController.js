({
    // initialize creates columns for datatable
    init : function(component, event, helper) {
        helper.SetColumns(component);
        helper.getHeroes(component);
        helper.getInterviews(component);
    },
    
    handleCohort : function(component, event, helper) {
        helper.SetCohort(component, event);
    },

    // row selection handles button to start interview
    handleRowSelection : function(component, event, helper) {
        helper.handleRowSelection(component, event)
    },

    LaunchInterview : function(component, event, helper){
        console.log("LAUNCH INTERVIEW FUNCTION");
        helper.LaunchInterviewEvent(component, event);
    }
})