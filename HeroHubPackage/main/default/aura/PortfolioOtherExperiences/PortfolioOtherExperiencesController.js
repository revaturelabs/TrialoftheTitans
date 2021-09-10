({
    /*doInit() sets the attribute columns for datatable
    and calls the doGetExperience() method from the helper file, passing in component */
    doInit : function(component, event, helper){

        var actions = [
            {label: 'Edit', name: 'edit'},
            {label: 'Delete', name: 'delete'},
            {label: 'View', name: 'view'}
        ];
        component.set("v.Columns", [
            {label:"Company", fieldName:"Company__c", type:"text",editable:'true' },
            {label:"Position", fieldName:"Position__c", type:"text",editable:'true' },
            {label:"Start Date", fieldName:"Start_Date__c", type:"text",editable:'true'},
            {label:"End Date", fieldName:"End_Date__c", type:"text",editable:'true'},
            {label:"Location Type", fieldName:"Location_Type__c", type:"text" ,editable:'true'},
            {type: 'action', typeAttributes: { rowActions: actions } } 

        ]);

        helper.doGetExperiences(component);
    },

    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'edit':
                helper.editRecord(component, event,row);
                break;
            case 'delete':
                helper.deleteRecord(component, event);
                break;
            case 'view':
                helper.viewRecord(component, event);
                break;
        }
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