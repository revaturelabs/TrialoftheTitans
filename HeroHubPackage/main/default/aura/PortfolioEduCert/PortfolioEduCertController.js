({
    editEduCert : function(component, event, helper) {
        component.set('v.isEdit',true);
    },

    cancelEdit : function(component, event, helper) {
        component.set('v.isEdit',false);
    },

    submitEdit : function(component, event, helper) {
        // TODO: add controller logic to database

        component.set('v.isEdit',false);
    }
})
