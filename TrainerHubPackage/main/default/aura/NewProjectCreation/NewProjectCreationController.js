/////////////////////////////////////////////////////
//
//  Name: NewProjectCreationController
//  Author: Steven Magnin
//  Description: JavaScript Controller for the New Project Creation Aura Component
//
///////////////////////////////////////////////////

({
    //Called when the Cancel button is pressed. Changes attribute to display project list/homepage.
    cancelNewProjectCreation : function(component, event, helper) {
        helper.cancelCreate(component);

    },

    //Called when the Save button is pressed. Validates and inserts the new project and changes attribute to display project list/homepage.
    createNewProject : function(component, event, helper) {
        let name = component.find("nameInput").get("v.value");
        let desc = component.find("descInput").get("v.value");

        helper.doCreate(name, desc, component);

    },

    //Called when the Project Name field loses focus. Checks if project name already exists, and shows an error if so.
    checkIfProjectExists : function(component, event, helper) {
        let name = component.find("nameInput").get("v.value");
        
        helper.checkExistence(name, component);

    }
})
