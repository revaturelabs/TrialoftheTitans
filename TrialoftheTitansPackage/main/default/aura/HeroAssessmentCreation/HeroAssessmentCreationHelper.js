//////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Name: HeroAssessmentCreationHelper
//  Author: Chance Leonard
//  Description: JavaScript helper for the HeroAssessmentCreationController
//
////////////////////////////////////////////////////////////////////////////////////////////////////
({
	HideComponent : function(component) {
        //Fire event for parent component to handle to hide this component
        let changepage = component.getEvent("HeroAssessmentCreationHideEvent");
        changepage.setParams();
        changepage.fire();
	},
    
    SubmitClick : function(component) {
        //Give an alert for successful record creation and hide component
        let showToast = $A.get("e.force:showToast");
        showToast.setParams({
            "message" : "Successfully created record!",
            "type" : "success"
        });
        showToast.fire();

        this.HideComponent(component);
    }
})