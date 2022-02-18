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
        var action = component.get("c.fetchPastCohorts");
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
				var data = response.getReturnValue();
				component.set('v.data', data);        
            }
        });
        $A.enqueueAction(action);
    },
   
})