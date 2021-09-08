({
    OnInit : function(component, event, helper){
        helper.LoadHeros(component);
        helper.LoadCohorts(component);
        helper.LoadWeeks(component);

    },

    UpdateCohort : function(component, event, helper){
        // Triggered by UpdateCohortEvent
        helper.LoadCohortData(component, event.getParam("SelectedCohort"));
        
    },

    LaunchInterview : function(component, event, helper){
        helper.LaunchInterview(component);
    },

    D3 : function(component, event, helper){
        helper.D3(component, event);
    }
})
