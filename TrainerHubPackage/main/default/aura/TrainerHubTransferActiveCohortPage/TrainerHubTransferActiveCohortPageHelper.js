/////////////////////////////////////////////////////
// 
//  Name: TrainerHubTransferActiveCohortPage
//  Author: Brett Spokes
//  Description: Helper for populating and defining the navigation event for
//  	the active cohort specifically.
//	
/////////////////////////////////////////////////////

({
	transferToActiveCohort : function(cmp, event) {

		var action = cmp.get("c.fetchActiveCohort");
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
       			var data = response.getReturnValue();

				var cmpEvent  = cmp.getEvent("cohortIdEvent");
        		cmpEvent.setParam("CohortId", data);       
        		cmpEvent.fire();
            }
			
        });
        $A.enqueueAction(action);	

				

    }
})