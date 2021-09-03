({
    editProjOneRoles : function(component, event, helper) {

        component.set("v.editOne", true);

    },

    saveProjOneRoles : function(component, event) {

        //let projOneRoles = component.get("v.projOneRolesInput");
        //component.set("v.projectOneRoles", projOneRoles);
        component.set("v.editOne", false);

    }
})
