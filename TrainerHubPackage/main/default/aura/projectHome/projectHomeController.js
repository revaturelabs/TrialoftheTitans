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
<<<<<<< HEAD
        console.log("edit")

        component.set("v.selectedProjId", event.target.id)
        component.set("v.currentPage", "dynamicRow");

=======
        console.log("edit");
        console.log(event.target.id);
        component.set("v.currentPage", "dynamicRow");
        component.set("v.selectedProjId", event.target.id);
>>>>>>> StevenMagnin
    },
    
    
    more: function(component, event, helper) {
        console.log("more")
         component.set("v.currentPage", "morePage");
    },
    
    assign: function(component, event, helper) {
        console.log("assign")        
         component.set("v.currentPage", "assignmentPage");
    },
    
    addNewProject: function(component, event, helper) {
        console.log("addNewProject")   
<<<<<<< HEAD
         component.set("v.currentPage", "AddNewProjectPage");
=======
         component.set("v.currentPage", "NewProjectCreation");
>>>>>>> StevenMagnin
    },
})