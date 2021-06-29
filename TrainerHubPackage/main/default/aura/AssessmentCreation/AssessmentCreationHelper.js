//////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Name: AssessmentCreationHelper
//  Author: Chance Leonard
//  Description: JavaScript helper for the AssessmentCreationController
//
////////////////////////////////////////////////////////////////////////////////////////////////////
({
	HideComponent : function(component, event) {
        //Fire event for parent component to handle to hide this component
        var changepage = component.getEvent("AssessmentCreationHideEvent");
        changepage.setParams();
        changepage.fire();
	},
    
    SubmitClick : function(component, event, helper) {
        //Give an alert for successful record creation and hide component
        alert("Succesfully created record");
        this.HideComponent(component, event);
    }
})