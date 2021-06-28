({
    OnInit : function(component, event, helper){

        helper.LoadCohorts(component);

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
        // component.set('v.d3', true)
        console.log("D3 ACTIVATED");
        if(component.get("v.dataLoaded")) {
            helper.D3CohortOverview(component);
        }
        component.set("v.scriptsLoaded", true);
    }
})