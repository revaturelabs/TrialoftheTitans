({
    doInit : function(component, event, helper){
        helper.doGetExperiences(component);
    },
    
    /*edit() and cancel() flip the isEdit attribute on or off depending on whether edit() is called
    - for true - or cancel() is called - for false. After setting that attribute, the page refreshes. */
    edit : function(component, event, helper) {
        component.set('v.isEdit', false);
    },

    cancel : function(component, event, helper) {
        component.set('v.isEdit', true);
    }
})