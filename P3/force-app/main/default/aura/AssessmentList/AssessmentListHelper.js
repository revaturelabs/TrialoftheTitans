/////////////////////////////////////////////////////
//
//  Name: Assessment Hero List Helper
//  Author: Josue Cisneros
//  Description: Client-side JS Helper for the 
//               Assessment List component.                
//
///////////////////////////////////////////////////

({
    // get Assessment from the server
    fetchData : function(component) {
        component.set('v.columns',[
			{ label: 'View', type: 'button', initialWidth: 135, typeAttributes: { label: 'View Details', name: 'view_details', title: 'Click to View Details'}},
            { label: 'Name', fieldName: 'Name', type: 'text'},
            { label: 'Type', fieldName: 'Type__c', type: 'text'},
        ]);
        let action = component.get('c.AssessmentList');
        action.setCallback(this, (function (response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.data', response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
	
	showRowDetails : function(row, cmp, event) {
        let cmpEvent  = cmp.getEvent("sendAssessmentIdEvent");
        cmpEvent.setParam("AssessmentId", row.Id);
        cmpEvent.fire();
    },

	handleReturnComponentEvent : function(cmp, event) {
        cmp.set("v.ShowChosenAssessment", false);
		this.fetchData(cmp);
    },

	handleReturnAssessmentIdEvent : function(cmp, event) {
        let eventReturnedId = event.getParam("AssessmentId");
        // set the handler attributes based on event data
        cmp.set("v.AssessmentId", eventReturnedId);
        cmp.set("v.ShowChosenAssessment", true);
    },	
})