/////////////////////////////////////////////////////
//
//  Name: AssignProjectController.js
//  Author: Jonathan Neilan
//  Description: Initialization, view attribute updates on first picklist change,
//               submit and cancel buttons functionalities. Submit calls apex controller AssignProjectController.cls.
//
//  ToDo: Much of this code should be moved into the helper.js component file
//
///////////////////////////////////////////////////
({
    doInit : function(component, event, helper) {
        // function call to Apex controller to retrieve Account List and Cohort List from server
        let loadAccs = component.get("c.getAccounts");
        let loadCohs = component.get("c.getCohorts");

        loadAccs.setCallback(this, function(response) {
            // Set the list of accounts attribute
            let accs = response.getReturnValue();
            component.set('v.accountList', accs);
            // Set accsOptions attribute
            let items = [];
            let accountToIgnore = 'Sample Account for Entitlements';
            for (let i = 0; i < accs.length; i++) {
                if (accs[i].Name == accountToIgnore) {
                    continue; // Don't add the auto-generated SF background account
                }
                const item = {
                    'label': accs[i].Name,
                    'value': accs[i].Name
                };
                items.push(item);
            }
            component.set('v.accOptions',items);
        });

        loadCohs.setCallback(this, function(response) {
            // Set the list of cohorts attribute
            let cohs = response.getReturnValue();
            component.set('v.cohortList', cohs);
            // Set accsOptions attribute
            let items = [];
            for (let i = 0; i < cohs.length; i++) {
                const item = {
                    'label': cohs[i].Name,
                    'value': cohs[i].Name
                };
                items.push(item);
            }
            component.set('v.cohOptions',items);
        });

        $A.enqueueAction(loadAccs);
        $A.enqueueAction(loadCohs);


        // default initial value for grouping picklist (the first one)
        component.find('grouping').set('v.value', 'individual');
        component.set('v.individualSelected', true);
    },

    // Update view attributes when choosing between assigning by 'individuals' or 'cohorts'
        // i.e. the first picklist
    onGroupChange : function(component, event, helper) {
        let groupName = component.find('grouping').get('v.value');
        if (groupName == 'individual') {
            component.set('v.individualSelected', 'true');
        }
        else if (groupName == 'cohort') {
            component.set('v.individualSelected', 'false');        
        }
        else { // error
            alert('error');
        }
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
        let group = component.find('grouping').get('v.value');
        var options = [];
        if (group == 'individual') {
            options = component.find('accountAssignees').get('v.value');
        }
        else if (group == 'cohort') {
            options = component.find('cohortAssignees').get('v.value');
        }
        else {
            //error
        }

        // Make sure at least one name is selected
        if (options.toString().trim().length == 0) {
            alert('Must select at least one value');
            return;
        }
        // assign the project
        let names = (options+'').split(',');
        let action = component.get('c.assignProject');
        action.setParams({
            grouping : group,
            namesToAssign : names,
            projectIdToAssign : component.get('v.projectId')
        });
        
        $A.enqueueAction(action);

        // set the new display to 'projectHome'
        component.set('v.currentPage', 'homePage');
    },
    assignCancel : function(component, event, helper) {
        component.set('v.currentPage', 'homePage');
    }
})
