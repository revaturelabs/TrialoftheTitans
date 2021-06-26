({
    //retrieve all questions from exam results that are within a question pool and set to an attribute
    DoInit : function(component, event, helper) {
        let getExamPoolQuestions = component.get("c.GetAllExamResultPoolQuestions");
        console.log('HIIIIII' + component.get('v.examResultId'))
        getExamPoolQuestions.setParams({
            'examResultId': component.get('v.examResultId')
        })
        getExamPoolQuestions.setCallback( this, function( response ) {
            if( response.getState() === "SUCCESS" ){

                var allExamResultPoolQuestions = response.getReturnValue();
                console.log("Getting Exam Question Info",  allExamResultPoolQuestions);
                component.set( "v.ExamResultPoolQuestions",  allExamResultPoolQuestions );
                component.set( "v.QuestionPoolReset",  allExamResultPoolQuestions );
            }
            else {
                console.log('No Pools in this Exam')
            }
        });
        $A.enqueueAction(getExamPoolQuestions);

    },
    //retrieve all correctly answered questions from exam results that are within a question pool
    RetrieveCorrectExamResultPools : function(component, event, helper){
        let getCorrectAnswerPool = component.get("c.GetCorrectExamResultPoolQuestions");
        console.log('HIIIIII' + component.get('v.examResultId'))
        getCorrectAnswerPool.setParams({
            'examResultId': component.get('v.examResultId')
        })
        getCorrectAnswerPool.setCallback( this, function( response ) {
            if( response.getState() === "SUCCESS" ){
                let resetPool = component.get("v.QuestionPoolReset")
                var correctExamResultPoolQuestions = response.getReturnValue();
                component.set( "v.ExamResultPoolQuestions",  resetPool);
                
               //Calculates the percentage per pool
               helper.CalculatePoolPercentage(component, correctExamResultPoolQuestions);
            }
            else {
                console.log('No correct answers in a pool')
            }
        });
        $A.enqueueAction(getCorrectAnswerPool);
        helper.ToggleExamPoolPercentage(component, event, helper);
    },

})
