({
    /*doInit() sets the attribute columns for datatable
    and calls the doGetExperience() method from the helper file, passing in component */
    doInit : function(component, event, helper){

        var actions = [
            { label: 'Delete', name: 'delete' }
        ];

        component.set("v.columns", [
            {label:"Company", fieldName:"Company__c", type:"text",editable:true },
            {label:"Position", fieldName:"Position__c", type:"text",editable:true },
            {label:"Start Date", fieldName:"Start_Date__c", type:"date-local",editable:true },
            {label:"End Date", fieldName:"End_Date__c", type:"date-local",editable:true },
            { type: 'action', typeAttributes: { rowActions: actions } }
        ]);

        helper.doGetExperiences(component);
    },

    /*onSave() handles saving records edited through inline editing, and updates experiences using doGetExperiences() */
    onSave : function(component, event, helper){
        var draftValues = event.getParam('draftValues');

        helper.saveExperience(component, draftValues);
        helper.doGetExperiences(component);
    },

    /*handleRowAction() handles different row actions. Currently, there is only a delete action, but the method is set up to handle
    different row actions */
    handleRowAction : function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');

        switch (action.name) {
            case 'delete':
                helper.removeExperience(component, row);
                break;
        }
        helper.doGetExperiences(component);
    },
    
    /*edit() and cancel() flip the isEdit attribute on or off depending on whether edit() is called
    - for true - or cancel() is called - for false. After setting that attribute, the page should update to reflect 
    experiences added to our records. */
    edit : function(component, event, helper) {
        component.set('v.isEdit', false);
    },

    cancel : function(component, event, helper) {
        component.set('v.isEdit', true);
        helper.doGetExperiences(component);
    }
})