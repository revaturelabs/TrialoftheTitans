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
        var action = component.get('c.AssessmentList');
        action.setCallback(this, (function (response) {
            var state = response.getState();
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
        var cmpEvent  = cmp.getEvent("sendAssessmentIdEvent");
        cmpEvent.setParam("AssessmentId", row.Id);
        
        cmpEvent.fire();
		//Alert just for debugging purposes, remove this after complete integration of component
		//alert("Fired Event with " + row.Id + " as the Id");
    },

	handleReturnComponentEvent : function(cmp, event) {
        cmp.set("v.ShowChosenAssessment", false);
		this.fetchData(cmp);
    },

	handleReturnAssessmentIdEvent : function(cmp, event) {
        var eventReturnedId = event.getParam("AssessmentId");
        // set the handler attributes based on event data
        cmp.set("v.AssessmentId", eventReturnedId);
        cmp.set("v.ShowChosenAssessment", true);
    },	
})