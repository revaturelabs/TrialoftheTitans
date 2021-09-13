/////////////////////////////////////////////////////
// 
//  Name: TrainerHubAndCohortsPage
//  Author: Brett Spokes
//  Description: Helper for Trainer Hub and Cohort Page navigation 
//	
/////////////////////////////////////////////////////

({
	handleCohortIdEvent : function(cmp, event) {
		var message = event.getParam("CohortId");
        // set the handler attributes based on event data
        cmp.set("v.CohortId", message);

        cmp.set("v.CohortPageActive", true);
		
		
    },

    handleClick : function(cmp) {
        cmp.set("v.CohortPageActive", false);
    },

	
})