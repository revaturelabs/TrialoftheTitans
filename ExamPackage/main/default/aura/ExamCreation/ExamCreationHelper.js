({
    // get question pools from server
    // currently getting all of them
    // unless searchbar is triggered
    GetQuestionPools : function(component) {
        let action = component.get("c.GetQuestionPool");
        let searchKeyword = component.get("v.searchKeyword");
        action.setParams({
            'searchKeyword' :   searchKeyword});
        
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state = 'SUCCESS'){
                console.log('Success!');
                let x = response.getReturnValue();
                component.set("v.questionPoolMap", x);
                
                // set to first page
                component.set("v.questionPool", x[1]);
                
                // set lastpage to true when there is no page two in map.
                if(!x[2]){
                    component.set("v.isLastPage", true);
                }
                
            }else{
                console.log('Error!');
            }
            
        });
       	$A.enqueueAction(action);
    },
    // get questions from a pool
    // current have no pagination whatsoever
    // honestly the ability to view question from a pool is kinda pointless.
    // so might just remove it entirely.
    ShowQuestions : function(component, poolId){
        let action = component.get("c.GetExamQuestions");
        action.setParams({'poolId': poolId});
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state = 'SUCCESS'){
                let x = response.getReturnValue();
                component.set("v.questionShow", x);
            }else{
                console.log('Error!');
            }
            
        });
       	$A.enqueueAction(action);
    },
    // Send the information to the server for insert
    // poolAndNumber is a map
    CreateExamAssignment : function(component, poolAndNumber, examId){
        let action = component.get("c.CreateExamAssignment");
        action.setParams({
            'examId': examId,
            'poolAndNumber': poolAndNumber
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state = 'SUCCESS'){
                console.log('Success!');
            }else{
                console.log('Error!');
            }
        });
       	$A.enqueueAction(action);
        
    }
})