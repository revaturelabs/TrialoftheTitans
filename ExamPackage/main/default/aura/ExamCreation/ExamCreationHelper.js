({
    // get questions pools from server
    // currently getting all of them
    // need some search or filter functionality.
    getQuestionPools : function(component) {
        let action = component.get("c.getQuestionPool");
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state = 'SUCCESS'){
                
                let x = response.getReturnValue();
                component.set("v.questionPoolMap", x);
                
                // set to first page
                component.set("v.questionPool", x[1]);
                
                // set lastpage to true when there is no page two in map.
                if(!x[2]){
                    component.set("v.isLastPage", true);
                }
                
            }else{
                component.find('notifLib').showToast({
                    "title": "Error.",
                    "message": "Was not able to retrieve question pools."
                });
            }
            
        });
       	$A.enqueueAction(action);
    },
    // get questions from a pool
    // current have no pagination whatsoever
    // honestly the ability to view question from a pool is kinda pointless.
    // so might just remove it entirely.
    showQuestions : function(component, poolId){
        let action = component.get("c.getExamQuestions");
        action.setParams({'poolId': poolId});
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state = 'SUCCESS'){
                let x = response.getReturnValue();
                component.set("v.questionShow", x);
            }else{
                component.find('notifLib').showToast({
                    "title": "Error.",
                    "message": "Was not able to retrieve questions."
                });
            }
            
        });
       	$A.enqueueAction(action);
    },
    // just send the information to the server for insert
    // poolAndNumber is a map
    createExamAssignment : function(component, poolAndNumber, examId){
        let action = component.get("c.createExamAssignment");
        action.setParams({
            'examId': examId,
            'poolAndNumber': poolAndNumber
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state = 'SUCCESS'){
                component.find('notifLib').showToast({
                    "title": "Success!",
                    "message": "The record has been updated successfully."
                });
            }else{
                component.find('notifLib').showToast({
                    "title": "Error.",
                    "message": "The record was not updated."
                });
            }
        });
       	$A.enqueueAction(action);
        
    }
})