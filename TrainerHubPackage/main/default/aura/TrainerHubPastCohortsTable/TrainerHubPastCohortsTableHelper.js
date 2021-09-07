/////////////////////////////////////////////////////
// 
//  Name: TrainerHubPastCohortsTable
//  Author: Brett Spokes
//  Description: Helper for populating and defining the navigation event
//	
/////////////////////////////////////////////////////

({
    fetchCohortsHelper : function(component, event) {
        component.set('v.columns', [
            {label: 'Cohort', fieldName: 'Name', type: 'text'},
            {label: '', type: 'button', initialWidth: 135, typeAttributes: { label: 'Go To Page', name: 'view_details', title: 'Click to Go To Cohorts Page'}}
        ]);
        let action = component.get("c.fetchPastCohorts");
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS") {
				let data = response.getReturnValue();
				component.set('v.data', data);        
            }
        });
        $A.enqueueAction(action);
    },
    
    navigateToMyComponent :  function(component, event){
        	let row = event.getParam('row');
		let cmpEvent  = component.getEvent("cohortIdEvent");
        cmpEvent.setParam("CohortId", row.Id);
        
        cmpEvent.fire();		

    }
   
})