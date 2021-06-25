({
    OnInit : function(component, event, helper){

        helper.LoadCohorts(component);

    },

    UpdateCohort : function(component, event, helper){
        //let selectedCohort = event.getParam("SelectedCohort");
        //console.log("QCHUBHOME HANDLER: " + selectedCohort);
        //console.log("cObj in String Format===>"+JSON.stringify(selectedCohort) );
        helper.LoadCohortData(component.event.getParam("SelectedCohort"))
        component.set("v.NoCohortSelected", false);
        
    },


    doInit: function( component, event, helper ) {
       
    }
})