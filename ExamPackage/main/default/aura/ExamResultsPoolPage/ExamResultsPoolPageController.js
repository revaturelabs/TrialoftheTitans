({
    //retrieve all questions from exam results that are within a question pool and set to an attribute
    DoInit: function (component, event, helper) {
        let getCorrectAnswerPool = component.get("c.GetCorrectExamResultPoolQuestions");
        getCorrectAnswerPool.setParams({
            'examResultId': component.get('v.examResultId')
        })
        getCorrectAnswerPool.setCallback(this, function (response) {
            if (response.getState() === "SUCCESS") {
                let correctExamResultPoolQuestions = response.getReturnValue();
                console.log(correctExamResultPoolQuestions)
                //Calculates the percentage per pool
                helper.CalculatePoolPercentage(component, event, correctExamResultPoolQuestions);
                // helper.drawD3(component, event, correctExamResultPoolQuestions);
            }
            else {
                console.log('No correct answers in a pool')
            }
        });

        let getExamPoolQuestions = component.get("c.GetAllExamResultPoolQuestions");
        getExamPoolQuestions.setParams({
            'examResultId': component.get('v.examResultId')
        })
        getExamPoolQuestions.setCallback(this, function (response) {
            if (response.getState() === "SUCCESS") {

                let allExamResultPoolQuestions = response.getReturnValue();
                console.log("Getting Exam Question Info", allExamResultPoolQuestions);
                component.set("v.ExamResultPoolQuestions", allExamResultPoolQuestions);
                component.set("v.QuestionPoolReset", allExamResultPoolQuestions);
            }
            else {
                console.log('No Pools in this Exam')
            }
        });

        helper.ToggleExamPoolPercentage(component, event, helper);
        $A.enqueueAction(getExamPoolQuestions);
        $A.enqueueAction(getCorrectAnswerPool);
    }
})