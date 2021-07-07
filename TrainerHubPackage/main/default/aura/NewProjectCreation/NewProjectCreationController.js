({
    cancelNewProjectCreation : function(component, event, helper) {
        helper.cancelCreate(component);

    },

    createNewProject : function(component, event, helper) {
        let name = component.find("nameInput").get("v.value");
        let desc = component.find("descInput").get("v.value");

        helper.doCreate(name, desc, component);

    },

    checkIfProjectExists : function(component, event, helper) {
        let name = component.find("nameInput").get("v.value");
        console.log('Name: ' + name);

        helper.checkExistence(name, component);

    }
})
