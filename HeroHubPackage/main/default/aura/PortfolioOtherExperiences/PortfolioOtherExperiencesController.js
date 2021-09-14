({
    /*doInit() sets the attribute columns for datatable
    and calls the doGetExperience() method from the helper file, passing in component */
    doInit : function(component, event, helper){

        component.set("v.columns", [
            {label:"Company", fieldName:"Company__c", type:"text",editable:true },
            {label:"Position", fieldName:"Position__c", type:"text",editable:true },
            {label:"Start Date", fieldName:"Start_Date__c", type:"date-local",editable:true },
            {label:"End Date", fieldName:"End_Date__c", type:"date-local",editable:true }

        ]);

        helper.doGetExperiences(component);
    },

    onSave : function(component, event, helper){
        var draftValues = event.getParam('draftValues');

        console.log('Save fired');
        console.log(draftValues);

        helper.saveExperience(component, draftValues);
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