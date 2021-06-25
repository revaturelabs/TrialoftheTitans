({
    OnInit : function(component, event, helper){

        helper.LoadCohorts(component);

    },

    UpdateCohort : function(component, event, helper){
        console.log("QCHUBHOME HANDLER");
        helper.LoadCohortData(component, event.getParam("SelectedCohort"));
        component.set("v.NoCohortSelected", false);
        
    },


    doInit: function( component, event, helper ) {
       
    }
})