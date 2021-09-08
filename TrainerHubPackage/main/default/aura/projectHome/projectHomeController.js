/////////////////////////////////////////////////////
//
//  Name: projectHomeController.js 
//  Author: Laurent Sanou
//  Description: this controller allows us to handle events/action 
//  			 within our component projectHome.cmp
//
///////////////////////////////////////////////////

({
    doInit : function(component, event, helper) {
        helper.retrieveAndDisplayProjectList(component);
    },
     
     edit: function(component, event, helper) {
        helper.edit(component, event);
    },
    
    
    assign: function(component, event, helper) { 
        helper.assign(component, event);
    },
    
    addNewProject: function(component, event, helper) {
        helper.addNewProject(component);
    },
})