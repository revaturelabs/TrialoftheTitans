({
    init : function(component, event, helper) {
        console.log("QCINTERVIEWHEROREVIEW INIT:");
        component.set("v.columns", 
            [
                {label:'Score', fieldName:'Score__c'},
                {label:'Question', fieldName:'Question__c'},
                {label:'Answer', fieldName:'Hero_Answer__c'},
            ]
        )
        //helper.getInterview(component, event)
        helper.createFlag(component, event)
    },

    // creates new row on button click
    AddNewRow : function(component, event, helper) { 
        helper.createFlag(component, event);
    },
    
    // deletes row on button click 
    DeleteNewRow : function(component, event, helper) {
        // get row to delete  
        var index = event.getParam("index");
        // get the flag list and remove the QC_Flag__c of index    
        var AllRowsList = component.get("v.flagList");
        AllRowsList.splice(index, 1);
        // set the flagList 
        component.set("v.flagList", AllRowsList);
    },

    saveFlags : function(component, event, helper) {
        // call validation helper to ensure flags all have description field filled
        if (helper.validateFlags(component, event)) {
  
            var action = component.get("c.setFlags");
            action.setParams({
                flags: component.get("v.flagList")
            });

            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    // if response is success then reset/blank the 'contactList' Attribute 
                    // and call the common helper method for create a default Object Data to Contact List 
                    component.set("v.flagList", []);
                    helper.createFlag(component, event);
                    alert('Flags Saved');
                }
            });
            // enqueue the server side action  
            $A.enqueueAction(action);
        }
    },

    handleFinalize : function(component, event, helper) {
        helper.setFlags(component, event);
        helper.finalizeInterview(component,event);
        helper.UpdateStage(component, "Start");
    },
    handleCreateFlag : function(component, event, helper) {
        let name = event.getParam("flagName");
        let description = event.getParam("flagDescription");
        let type = event.getParam("flagType");
        console.log(name, description, type);
        component.set("v.newFlagName", name);
        component.set("v.newFlagDesc", description);
        component.set("v.newFlagType", type);
        
    },
    Submit : function(component, event, helper){
        console.log("In submit function");
        let HeroId = component.get("v.HeroId");
        let HeroName = component.get("v.HeroName");
        let CohortId = component.get("v.CohortId");
        let Week = component.get("v.Week");
        let HeroAnswers = component.get("v.answers");
        let Flags = component.get("v.flagList");
        let newFlagName = component.get("v.newFlagName");
        let newFlagDesc = component.get("v.newFlagDesc");
        let newFlagType = component.get("v.newFlagType");
        console.log("Variable");
        helper.SubmitInterview(component, HeroId, HeroName, CohortId, Week, HeroAnswers, Flags, newFlagName, newFlagDesc, newFlagType);
    }
})