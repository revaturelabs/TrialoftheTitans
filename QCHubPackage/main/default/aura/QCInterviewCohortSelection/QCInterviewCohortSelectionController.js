({
    handleCohort : function(component, event, helper) {
        helper.SetCohort(component, event);
    },

    handleRowSelection : function(component, event, helper) {
        helper.handleRowSelection(component, event)
    },

    LaunchInterview : function(component, event, helper){
        helper.LaunchInterviewEvent(component, event);
    },
    CohortChange : function(component, event, helper){
        helper.SetColumns(component);
        helper.getHeroes(component);
        helper.getInterviews(component);
    }
})