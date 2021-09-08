/////////////////////////////////////////////////////
// 
//  Name: TrainerHubAndCohortsPage
//  Author: Brett Spokes
//  Description: Helper for Trainer Hub and Cohort Page navigation 
//	
/////////////////////////////////////////////////////

({
	handleCohortIdEvent : function(component, event) {
		let message = event.getParam("CohortId");
        // set the handler attributes based on event data
        component.set("v.CohortId", message);

        component.set("v.CohortPageActive", true);
		
		
    },

    handleClick : function(component) {
        component.set("v.CohortPageActive", false);
    },

	
})