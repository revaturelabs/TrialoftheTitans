({
    init : function(component, event, helper) {
          
        helper.createFlagColumns(component);
        helper.createFlag(component, event);
    },

    // creates new row on button click
    AddNewRow : function(component, event, helper) { 
        helper.createFlag(component, event);
    },
    
    // deletes row on button click 
    DeleteNewRow : function(component, event, helper) {
        helper.deleteRow(component, event);
    },

    saveFlags : function(component, event, helper) {
        // call validation helper to ensure flags all have description field filled
        helper.saveFlags(component, event);
    },

    handleFinalize : function(component, event, helper) {
        helper.setFlags(component, event);
        helper.finalizeInterview(component,event);
        helper.UpdateStage(component, "Start");
    },
    handleCreateFlag : function(component, event, helper) {
        
        helper.handleCreateFlag(component, event); 
    },
    Submit : function(component, event, helper){
        
        helper.SubmitInterview(component);
    }
})