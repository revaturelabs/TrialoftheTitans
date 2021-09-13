({
    /*doInit() sets the attribute columns for datatable
    and calls the doGetExperience() method from the helper file, passing in component */
    doInit : function(component, event, helper){

        component.set("v.Columns", [
            {label:"Company", fieldName:"Company__c", type:"text",editable:'true' },
            {label:"Position", fieldName:"Position__c", type:"text",editable:'true' },
            {label:"Start Date", fieldName:"Start_Date__c", type:"date-local",editable:'true'},
            {label:"End Date", fieldName:"End_Date__c", type:"date-local",editable:'true'}

        ]);

        helper.doGetExperiences(component);
    },


    onSave : function(component, event, helper){
        helper.handleSave(component, event);
    },
    
    /*edit() and cancel() flip the isEdit attribute on or off depending on whether edit() is called
    - for true - or cancel() is called - for false. After setting that attribute, the page refreshes. */
    edit : function(component, event, helper) {
        component.set('v.isEdit', false);
    },

    cancel : function(component, event, helper) {
        component.set('v.isEdit', true);
    },

    handleError : function(component, event, helper){
        helper.showErrorToast(component, event);
    }
})