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

        console.log("liEvent received, launching interview");
        helper.LaunchInterview(component);
    },


    doInit: function( component, event, helper ) {
       
    },

    D3 : function(component, event, helper){
        helper.D3(component, event);
    }
})
