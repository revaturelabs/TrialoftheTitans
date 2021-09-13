({
    myAction : function(component, event, helper) {
        
        var actions = [
            {label: 'Edit', name: 'edit'},
            {label: 'Delete', name: 'delete'},
            
        ];
            component.set("v.Columns", [
            
            {label:"QC Question Name", fieldName:"Name", type:"text"  },
            {label:"Question Body", fieldName:"Question_Body__c", type: 'text'},
            {label:"Expected Answer", fieldName:"Expected_Answer__c", type:"text"  },
            {label:"QC Question Deck ", fieldName:"QC_Question_Deck__c", type:"lookup",sortable : true  },
            {type: 'action', typeAttributes: { rowActions: actions } } 
        ]);
        helper.retrieveRecords(component);
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
           
        }
    },  
    handleShowToast : function(component, event, helper) {        
        helper.showToastEdit(component, event);
    }, 
    handleSortData : function(component, event, helper) {        
        helper.sortData(component, event);
    }, 
    updateColumnSorting: function (component, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortDirection);
        helper.sortData(component, fieldName, sortDirection);
    }, 
   
    handleSelectedRows : function(component, event, helper) {        
         helper.selectedRows(component, event,helper);
    },
    handleSelect : function(component, event, helper) {
        
        var selectedRows = event.getParam('selectedRows'); 
        var setRows = [];
        for ( var i = 0; i < selectedRows.length; i++ ) {
            
            setRows.push(selectedRows[i]);

        }
        component.set("v.selectedRowsToDel", setRows);
        if( selectedRows.length == 0 ){
            
             component.set("v.enableMultipleRowsButton", false);
            
        }
        else{
            
            component.set("v.enableMultipleRowsButton", true);
        }
        
    },
    downloadCSV : function(component, event, helper) {
        var questions = component.get('v.selectedRowsToDel');
        var csv = helper.convertToCSV(component, questions);
        if(csv == null){
            return;
        }
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,'+encodeURI(csv);
        hiddenElement.target = '_self';
        hiddenElement.download = 'QCQuestionData.csv';
        document.body.appendChild(hiddenElement);
        hiddenElement.click();
    }
    
    
})