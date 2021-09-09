/////////////////////////////////////////////////////
//
//  Name: Equivalency Component Controller
//  Author: Nathan Tellez
//  Description: Load values for picklist, fire events for adding and deleting rows
//
///////////////////////////////////////////////////
({
    doInit : function(component, event, helper){
    helper.doInit(component);
    },
    
	addNewRow : function(component, event, helper){
       // fire the AddNewRowEvt Lightning Event 
        component.getEvent("AddRowEvent").fire();     
    },
    
    removeRow : function(component, event, helper){
     // fire the DeleteRowEvt Lightning Event and pass the deleted Row Index to Event parameter/attribute
       component.getEvent("DeleteRowEvent").setParams({"indexVar" : component.get("v.rowIndex") }).fire();
    }
})