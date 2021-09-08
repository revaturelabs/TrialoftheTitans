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
    viewRecord : function(component, event) {
        var row = event.getParam('row');
        var recordId = row.Id;
        var navEvt = $A.get("event.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId,
            "slideDevName": "detail"
        });
        navEvt.fire();
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
                 if (state === "SUCCESS") {
                    var qcQuestionList = response.getReturnValue();
                    if(qcQuestionList.length < component.get("v.pageSize")){
                        component.set("v.isLastPage", true);
                    } else{
                        component.set("v.isLastPage", false);
                    }
                   
                    
                    $A.get('e.force:refreshView').fire();
                    component.set("v.dataSize", qcQuestionList.length);
                    component.set("v.qcQuestionList", response.getReturnValue());
                }
                 
                
            });
            
    
            $A.enqueueAction(action);
    
    
         } ,
})
