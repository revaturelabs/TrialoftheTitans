/////////////////////////////////////////////////////
//
//  Name: Dynamic Row Controller
//  Author: Nathan Tellez
//  Description: Initializes the equivalency object and adds new ones when adding rows and handles saving to database
//
///////////////////////////////////////////////////
({
	doInit : function(component, event, helper) {
        // create a Default RowItem [Equivalency Instance] on first time Component Load 
        helper.retrieveCurrentEquivalencies(component);
        helper.createEquivalencyData(component);
    },
 
    // function to save the Records 
    Save : function(component, event, helper) {
        helper.Save(component, event);
    },
    
    Cancel : function(component){
        helper.Cancel(component);
    },
 
    // function to create new object Row in equiv List 
    addNewRow : function(component, event, helper) {
        // call the "createObjectData" helper method to add new Object Row to List  
        helper.createEquivalencyData(component);
    },
 
    // function to delete the row 
    removeDeletedRow : function(component, event, helper) {
        helper.removeDeletedRow(component, event);
    }
})