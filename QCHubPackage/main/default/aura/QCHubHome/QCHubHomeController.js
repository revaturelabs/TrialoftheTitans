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
        // component.set('v.d3', true)
        console.log("D3 ACTIVATED");
        console.log(component.get("v.DataLoaded"));
        console.log(component.get("v.ScriptLoaded"));
        if (component.get("v.DataLoaded")){
            helper.D3CohortOverview(component);
        }
        component.set("v.ScriptLoaded", true);
    }
})
