({
    init : function(component, event, helper) {
        helper.initColumns(component);
        helper.createFlag(component, event);
    },

    // creates new row on button click
    AddNewRow : function(component, event, helper) { 
        helper.createFlag(component, event);
    },
    
    // deletes row on button click 
    DeleteNewRow : function(component, event, helper) {
        helper.deleteFlag(component, event);
    },

    saveFlags : function(component, event, helper) {
        helper.saveFlags(component);
    },

    handleFinalize : function(component, event, helper) {
        helper.setFlags(component, event);
        helper.finalizeInterview(component,event);
        helper.UpdateStage(component, "Start");
    },
    
    handleCreateFlag : function(component, event, helper) {
        helper.handleCreateFlag(component, event);
        
    },
    Submit : function(component, event, helper) {
        helper.SubmitInterview(component);
    }
})