({
    doInit : function(component, event, helper) {
        let getExamQuestions = component.get("c.getExamResultPools");
        let numberCorrect = 3;
        let hero;
        getExamQuestions.setCallback( this, function( response ) {
            if( response.getState() === "SUCCESS" ){
                const ExamQuestionResults = response.getReturnValue();
                for(let i in ExamQuestionResults){
                    console.log('Before Divide ' + ExamQuestionResults[i].Number_to_pull__c)
                    ExamQuestionResults[i].Number_to_pull__c = numberCorrect/ExamQuestionResults[i].Number_to_pull__c
                    console.log(ExamQuestionResults[i].Question_Pool__r.Name + " " + ExamQuestionResults[i].Number_to_pull__c)
                    
                }
                console.log("Getting Exam Question Info", ExamQuestionResults);
                component.set( "v.questionPool", ExamQuestionResults );
            }
            else {
                console.log('No Pools in this Exam')
            }
        });
        $A.enqueueAction(getExamQuestions);

    },

    poolEvent : function(component, event, helper){
        let getCorrectAnswerPool = component.get("c.getExamResultAnswers");

        getCorrectAnswerPool.setCallback( this, function( response ) {
            if( response.getState() === "SUCCESS" ){
                const CorrectAnswerPool = response.getReturnValue();
                console.log("Correct Answers from each pool", CorrectAnswerPool);
                component.set( "v.poolmap", CorrectAnswerPool);
            }
            else {
                console.log('No correct answers in a pool')
            }
        });
        $A.enqueueAction(getCorrectAnswerPool);

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
