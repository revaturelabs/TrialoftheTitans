/////////////////////////////////////////////////////
// 
//  Name: TrainerHubPastCohortsTable
//  Author: Brett Spokes
//  Description: Controller for populating and defining the navigation event
//	
/////////////////////////////////////////////////////

({
	fetchData : function(component, event, helper) {
        helper.fetchCohortsHelper(component, event);
    },
    
    navigateToMyComponent : function(component, event, helper) {

		var row = event.getParam('row');
		var cmpEvent  = component.getEvent("cohortIdEvent");
        cmpEvent.setParam("CohortId", row.Id);
        
        cmpEvent.fire();		

    }

})