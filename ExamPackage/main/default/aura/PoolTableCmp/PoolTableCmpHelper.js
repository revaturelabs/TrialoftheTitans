({
    getData : function(searchKeyword,component) {
        component.set('v.mycolumns', [
            { label: 'Question Title', fieldName: 'Name', type: 'text'},      
            { label: 'Question Text', fieldName: 'Question_Text', type: 'text'},
            { label: 'Question Type', fieldName: 'Question_Type', type: 'text'}
        ]);
        //debugger;
        // Getting Values from the client to send to server
        var pageSize = component.get("v.pageSize").toString();
        var pageNumber = component.get("v.pageNumber").toString();
        // get selected pool
        var textPools = component.get("v.selectedPools");
        if(textPools.length>0){
            var arrayTextPools = textPools[0].split(';');
            var objectPools = component.get("v.pools");
            var selectedObjectPools = [];
            
            for(let i = 0 ;i<arrayTextPools.length;i++ ){
                for(let j=0;j<objectPools.length;j++){
                    if(arrayTextPools[i]==objectPools[j].Name)
                    {
                        selectedObjectPools.push(objectPools[j]);
                    }
                }
            } 
        } else{
            selectedObjectPools = null;
        }
        
        //****************Get Question List*********************
        let action = component.get('c.GetQues');
        action.setParams({
            'searchKeyword' :   searchKeyword,
            'pools'			:   selectedObjectPools,
            'pageSize' 		:	pageSize,
            'pageNumber' 	:	pageNumber
        });
        // setting CallBack to interact with server side
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();
                debugger;
                // Translation from Sobject to JS
                let rows = [];
                for (let i = 0; i < resultData.length; i++) {
                    let items = {
                        Id			  : resultData[i].Id,
                        Name		  :	resultData[i].Name,
                        Question_Text :	resultData[i].Question_Text,
                        Question_Type : resultData[i].Question_Type
                    };
                    rows.push(items);
                }
                //debugger;
                component.set("v.dataSize", rows.length);
                component.set("v.mydata", rows);
            } else if (state === "ERROR") {
                var errors = response.getError();
            }
        });
        $A.enqueueAction(action);
    },
    getPools : function(searchKeyword,component) {
        
        //*********************Get pool list*******************
        let action2 = component.get('c.GetPool');
        // setting CallBack to interact with server side
        action2.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var resultData2 = response.getReturnValue();
                
                // Translation from Sobject to JS
                let rows = [];
                for (let i = 0; i < resultData2.length; i++) {
                    let items = {	
                        Id			  : resultData2[i].assignedQues[0].Id,
                        Name		  :	resultData2[i].assignedQues[0].Name
                    };
                    rows.push(items);
                }
                
                component.set("v.pools", rows);
 
                
            } else if (state === "ERROR") {
                var errors = response.getError();
            }
        });
        $A.enqueueAction(action2);
    },
    
    //======================================Delete Question from pool==============================================
    delQuesPool : function(component){
        debugger;
        
        var textPools = component.get("v.selectedPools");
        
        if(textPools.length>0){
            var arrayTextPools = textPools[0].split(';');
            var objectPools = component.get("v.pools");
            var selectedObjectPools = [];
            
            for(let i = 0 ;i<arrayTextPools.length;i++ ){
                for(let j=0;j<objectPools.length;j++){
                    if(arrayTextPools[i]==objectPools[j].Name)
                    {
                        selectedObjectPools.push(objectPools[j]);
                    }
                }
            } 
        } else{
            selectedObjectPools = null;
        }
        
        
        //var selectedObjectPools = JSON.stringify(selectedObjectPools)
        var questions = component.get("v.selectedRows");
        var enableToast = component.get("v.enableToast").toString();
        debugger;
        // validating questions and pools
        if(questions.length<=0 || textPools.length<=0){
            selectedObjectPools = null;
            questions =null;
            
            //Toast message
            if(enableToast=="true"){
                component.find('notifLib').showNotice({
                    "variant": "error",
                    "header": "Invalid selections!",
                    "message": "Please select at least a question to delete from a pool.",
                    closeCallback: function() {
                        $A.get('e.force:refreshView').fire();
                    }
                })
            }
            // Exit function 
            return;
        } 
        debugger;
        let action3 = component.get('c.deleteQuesPool');
        action3.setParams({
            'pools' 			:  selectedObjectPools,
            'questions' 		:  questions
        });
        
        
        
        // setting CallBack to interact with server side
        action3.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var resultData3 = response.getReturnValue();
                
                //Toast message
                if(enableToast=="true"){//Toast message
                    if(enableToast=="true"){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'Successfully deleted Questions from the Pools',
                            message: 'You can check the questions in pool !!!',
                            duration:' 4000',
                            key: 'info_alt',
                            type: 'success',
                            mode: 'pester'
                        });
                        toastEvent.fire();
                    }
                }
             //refresh the questions table
             let searchKeyword = component.get("v.searchKeyword");
             this.getData(searchKeyword,component); 
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                
            }
        });
        $A.enqueueAction(action3);
    },
})