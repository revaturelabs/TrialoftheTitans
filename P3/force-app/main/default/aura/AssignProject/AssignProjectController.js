/////////////////////////////////////////////////////
//
//  Name: AssignProjectController.js
//  Author: Jonathan Neilan
//  Description: Initialization, view attribute updates on first picklist change,
//               submit and cancel buttons functionalities. Submit calls apex controller AssignProjectController.cls.
//
///////////////////////////////////////////////////
({
    doInit : function(component, event, helper) {
        helper.doInit(component,event);
    },
    // Update view attributes when choosing between assigning by 'individuals' or 'cohorts'
        // i.e. the first picklist
    onGroupChange : function(component, event, helper) {
      helper.onGroupChange(component,event);
    },

    // For potential future purpose if additional action needs to happen upon initial selection in the picklist
    handleAccChange : function(component, event, helper) {
        // This will contain an array of the "value" attribute of the selected options
        let selectedOptionValue = event.getParam("value");
    },

    handleCohChange : function(component, event, helper) {
        // This will contain an array of the "value" attribute of the selected options
        let selectedOptionValue = event.getParam("value");
    },

    // Button onclick functionalities
    assignSubmit : function(component, event, helper) {
       helper.assignSubmit(component, event);
    },
    assignCancel : function(component, event, helper) {
        component.set('v.currentPage', 'homePage');
    }
})