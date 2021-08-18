/////////////////////////////////////////////////////
//
//  Name: Equivalency Component Controller
//  Author: Nathan Tellez
//  Description: Load values for picklist, fire events for adding and deleting rows
//
///////////////////////////////////////////////////
({
    doInit : function(component, event, helper){
    	//populate skills list
    	let sListAction = component.get("c.getSkills");
        sListAction.setCallback(this, function(response){
            let state = response.getState();
            if(state == 'SUCCESS'){
                component.set("v.skillList", response.getReturnValue());
            }
        });
        $A.enqueueAction(sListAction);
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