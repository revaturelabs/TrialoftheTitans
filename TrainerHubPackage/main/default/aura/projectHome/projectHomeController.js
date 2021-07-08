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

        console.log("edit")

        component.set("v.selectedProjId", event.target.id)
        component.set("v.currentPage", "dynamicRow");



    },
    
    
    assign: function(component, event, helper) {
        console.log("assign")   
        component.set("v.selectedProjId", event.target.id);     
        component.set("v.currentPage", "AssignProject");
    },
    
    addNewProject: function(component, event, helper) {
        console.log("addNewProject")   

        component.set("v.currentPage", "NewProjectCreation");
    },
})