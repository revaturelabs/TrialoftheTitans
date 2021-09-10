({
    loadQuestionList : function(component, event, helper){
        var action = component.get('c.getQCQuestions');
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
                component.set('v.questionList', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    convertToCSV : function(component, questionList) {
        var stringResult, count, keys, columnDivider, lineDivider;
        
        if(questionList == null || !questionList.length){
            return null;
        }
        columnDivider = ',';
        lineDivider = '\n';

        keys = ['Name', 'Question_Body__c','Expected_Answer__c'];

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
