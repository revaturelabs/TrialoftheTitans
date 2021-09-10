({
    doInit : function(component, event, helper) {
        //component.set('v.columns', [
            //{label: 'Account Name', fieldName: 'Account__c', type: 'lookup', editable: true},
            //{label: 'Exam Name', fieldName: "Exam__c", type:'lookup', editable: true},
            //{label: 'Status', fieldName: "Status__c", type:'picklist', editable: true},
        //]);
        helper.fetchAllExams(component);
    },
    handleCreate : function(component, event, helper) {
        component.set('v.newAssignment', true);
        component.set('v.showList', false);
    },
    handleEdit : function(component, event, helper) {
        var selectedItem = event.currentTarget;
        var recId = selectedItem.dataset.record;

        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({ "recordId": recId });
        editRecordEvent.fire();
    },
    handleShowList : function(component, event, helper) {
        component.set('v.newAssignment', false);
        component.set('v.showList', true);
        helper.fetchAllExams(component);
    }
})
