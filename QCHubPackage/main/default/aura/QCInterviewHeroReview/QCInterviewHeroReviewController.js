({
    init : function(component, event, helper) {
        helper.initColumns(component);
        helper.createFlag(component);
    },

    // creates new row on button click
    AddNewRow : function(component, event, helper) { 
        helper.createFlag(component);
    },
    
    // deletes row on button click 
    DeleteNewRow : function(component, event, helper) {
        helper.deleteFlag(component, event);
    },

    saveFlags : function(component, event, helper) {
        helper.saveFlags(component);
    },

    handleFinalize : function(component, event, helper) {
        helper.setFlags(component);
        helper.finalizeInterview(component);
        helper.UpdateStage(component, "Start");
    },
    
    handleCreateFlag : function(component, event, helper) {
        helper.handleCreateFlag(component, event);
        
        helper.handleCreateFlag(component, event); 
    },
    Submit : function(component, event, helper) {
        helper.SubmitInterview(component);
    }
})