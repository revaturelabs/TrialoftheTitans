({
    myAction : function(component, event, helper) {

        var actions = [
            {label: 'Edit', name: 'edit'},
            {label: 'Delete', name: 'delete'},
            {label: 'View', name: 'view'}
        ];
        component.set("v.Columns", [

            {label:"QC Question Name", fieldName:"Name", type:"text"  },
            {label:"Question Body", fieldName:"Question_Body__c", type: 'text'},
            {label:"Expected Answer", fieldName:"Expected_Answer__c", type:"text"  },
            {label:"QC Question Deck", fieldName:"QC_Question_Deck__c", type:"lookup"  },
            {type: 'action', typeAttributes: { rowActions: actions } } 
        ]);

    },
    handleNext : function(component, event, helper) { 
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber+1);
        helper.retrieveRecords(component, helper);
    },
     
    handlePrev : function(component, event, helper) {        
        var pageNumber = component.get("v.pageNumber");
        component.set("v.pageNumber", pageNumber-1);
        helper.retrieveRecords(component, helper);
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
})
