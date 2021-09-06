/////////////////////////////////////////////////////
// 
//  Name: TrainerHubTransferActiveCohortPage
//  Author: Brett Spokes
//  Description: Helper for populating and defining the navigation event for
//  	the active cohort specifically.
//	
/////////////////////////////////////////////////////

({
	transferToActiveCohort : function(component, event) {

		let action = component.get("c.fetchActiveCohort");
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS") {
       			let data = response.getReturnValue();

				let componentEvent  = component.getEvent("cohortIdEvent");
        		componentEvent.setParam("CohortId", data);       
        		componentEvent.fire();
            }
			
        });
        $A.enqueueAction(action);	

				

    }
})