({
    doInit : function(component, event, helper) {
        let getExamQuestions = component.get("c.getExamResultPools");
        let numberCorrect = 5;
        let percent
        getExamQuestions.setCallback( this, function( response ) {
            if( response.getState() === "SUCCESS" ){
                const ExamQuestionResults = response.getReturnValue();
                for(let i in ExamQuestionResults){
                    ExamQuestionResults[i].Number_to_pull__c = numberCorrect/ExamQuestionResults[i].Number_to_pull__c;
                    console.log(ExamQuestionResults[i].Question_Pool__r.Name)
                }
                console.log("Getting Exam Question Info", ExamQuestionResults);
                component.set( "v.questionPool", ExamQuestionResults );
            }
            else {

            }
        });
        $A.enqueueAction(getExamQuestions);

    },
    navigater : function(component, event, helper){

        console.log('hit');
        const page = event.getParam('page');
        console.log(page);
        component.set("v.navigate", page);

    },

    ExamPoolFormToggle : function(component, event, helper) {
        component.set("v.revealPoolInfo", !component.get("v.revealPoolInfo"));
    },
    
})
