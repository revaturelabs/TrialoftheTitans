
({
    editRecord : function(component, event,row) {
        
        var row = event.getParam('row');
        var recordId = row.Id;
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": recordId
        });
        
        editRecordEvent.fire();
        
        
        
    }, 
    
    deleteRecord : function(component, event) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        
        var action = component.get("c.deleteQCQuestion");
        action.setParams({
            "qcq": row
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            
        });
        this.refresh();
        $A.enqueueAction(action);
    },
    retrieveRecords: function(component,event,helper){
        
        var pageSize = component.get("v.pageSize").toString();
        var pageNumber = component.get("v.pageNumber").toString();
        
        var action = component.get("c.getQCQuestion");
        action.setParams({
            recordId: component.get("v.recordId"),
            'pageSize' : pageSize,
            'pageNumber' : pageNumber
            
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var qcQuestionList = response.getReturnValue();
            if (state === "SUCCESS") {
                
                if(qcQuestionList.length < component.get("v.pageSize")){
                    component.set("v.isLastPage", true);
                } else{
                    component.set("v.isLastPage", false);
                }
                qcQuestionList.forEach(function(item){
                    
                    item.QC_Question_Deck__c= item.QC_Question_Deck__r.Name; 
                    
                    
                    
                });
                
                
                
                component.set("v.dataSize", qcQuestionList.length);
                component.set("v.qcQuestionList", response.getReturnValue());
            }
            
            
        });
        
        
        $A.enqueueAction(action);
        
        
    } ,
    
    showToastEdit : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been updated successfully.",
            "type": 'success',
        });
        toastEvent.fire();
    },
    
    sortData : function(component, fieldName, sortDirection) {
        var data = component.get("v.qcQuestionList"); 
        var reverse = sortDirection !== 'asc';
        data.sort(this.sortBy(fieldName, reverse))
        component.set("v.qcQuestionList", data);
    },
    
    sortBy : function(field, reverse, primer){
        var key = primer ?
            function(x) {return primer(x[field])} :
        function(x) {return x[field]};
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    },
    selectedRows : function(component, event, helper ) {
        
        
        var records = component.get("v.selectedRowsToDel");
        var action = component.get("c.deleteQCQuestionRows");
        action.setParams({
            "sRows": records
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            
        });
        this.refresh();
        $A.enqueueAction(action);
    },
    refresh : function(component, event, helper,row) {        
        $A.get('e.force:refreshView').fire();
    },
    popUp: function(component, event, helper) { 
        
        
        var boolVal = component.get("v.EditPopUp");
        
        
        if(boolVal==true){
            
            component.set("v.EditPopUp", false);
            
        }
        else{
            component.set("v.EditPopUp", true);
            
        }
    },
    editUsingPopup: function(component, event, helper) {  
        event.preventDefault();  
        var fields = event.getParam("fields");
        component.find('EdiQuestionRecordForm').submit(fields);
        this.refresh();
        
    },
	 selectRowHandle: function(component, event, helper) {  
         
        
           
        var selectedRows = event.getParam('selectedRows'); 
        var setRows = [];
        for ( var i = 0; i < selectedRows.length; i++ ) {
            
            setRows.push(selectedRows[i]);
            
        }
        component.set("v.selectedRowsToDel", setRows);
        if( selectedRows.length == 0    ){
            
             component.set("v.enableMultipleRowsButton", false);
             component.set("v.EnableEditPopUp", false);
        }
        else {
            
            component.set("v.enableMultipleRowsButton", true);
            
            
        }
        if(selectedRows.length == 1){
            for (var i = 0; i < selectedRows.length; i++){
                
                component.set("v.qcQuestionSelectEditID",selectedRows[i].Id);
                
            }
             component.set("v.EnableEditPopUp", true);  
            
        }
       else if(selectedRows.length > 1){
                component.set("v.EnableEditPopUp", false);
            }  
        
    },    
    convertToCSV : function(component, questionList) {
        var stringResult, count, keys, columnDivider, lineDivider;
        
        if(questionList == null || !questionList.length){
            return null;
        }
        columnDivider = ',';
        lineDivider = '\n';

        keys = ['Id', 'Name', 'Question_Body__c','Expected_Answer__c','QC_Question_Deck__c.Name'];

        stringResult ='';
        stringResult += keys.join(columnDivider);
        stringResult += lineDivider;

        for(var i = 0; i < questionList.length; i++){
            count = 0;

            for(var tempKey in keys){
                var skey = keys[tempKey];
                if(count > 0){
                    stringResult += columnDivider;
                }

                if(questionList[i][skey] != undefined){
                    stringResult += '"'+questionList[i][skey] + '"';
                }else{
                    stringResult += '"'+''+'"';
                }
                
                count++;
            }
            stringResult += lineDivider;
        }
        return stringResult;
    }
    
})
