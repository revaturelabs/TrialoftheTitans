/////////////////////////////////////////////////////
//
//  Name: Dynamic Row Controller
//  Author: Nathan Tellez
//  Description: Initializes the equivalency object and adds new ones when adding rows and handles saving to database
//
///////////////////////////////////////////////////
({
	doInit: function(component, event, helper) {
        // create a Default RowItem [Equivalency Instance] on first time Component Load 
        helper.retrieveCurrentEquivalencies(component);
        helper.createEquivalencyData(component, event);
    },
 
    // function to save the Records 
    Save: function(component, event, helper) {
        // first call the helper function in if block which will return true or false.
        // this helper function checks that skill_c will not be blank on each row.
        if (helper.validateRequired(component, event)) {
            // call the apex class method to save the equiv List
            // by passing the equiv List attribute to method param.  
            let action = component.get("c.saveEquivalency");
            action.setParams({
                "equivList": component.get("v.equivList")
            });
            // set call back 
            action.setCallback(this, function(response) {
                let state = response.getState();
                if (state === "SUCCESS") {
                    // if response is success then reset/blank the 'equivList' Attribute 
                    // and call the helper method to create a default Object Data to equiv List 
                    component.set("v.equivList", []);
                    helper.createEquivalencyData(component, event);
                    alert('Records Saved');
                    component.set("v.currentPage", "homePage");
                }
            });
            // enqueue the server side action  
            $A.enqueueAction(action);
        }
    },
    
    Cancel : function(component){
        component.set("v.currentPage", "homePage")
    },
 
    // function to create new object Row in equiv List 
    addNewRow: function(component, event, helper) {
        // call the "createObjectData" helper method to add new Object Row to List  
        helper.createEquivalencyData(component, event);
    },
 
    // function to delete the row 
    removeDeletedRow: function(component, event, helper) {
        // get the selected row Index for delete from Lightning Event Attribute  
        let index = event.getParam("indexVar");
        // get the all List (equivList attribute) and remove the Object Element Using splice method    
        let allRowsList = component.get("v.equivList");
        allRowsList.splice(index, 1);
        // set the equivList after removing selected row element  
        component.set("v.equivList", allRowsList);
    }
})