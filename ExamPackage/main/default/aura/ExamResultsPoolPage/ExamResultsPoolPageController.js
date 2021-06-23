({
    doInit : function(component, event, helper) {
        let getExamQuestions = component.get("c.getExamResultPools");
        let numbercorrect = 5;
        getExamQuestions.setCallback( this, function( response ) {
            if( response.getState() === "SUCCESS" ){
                const ExamQuestionResults = response.getReturnValue();
                for(let i in ExamQuestionResults){
                   // testvariable.push(ExamQuestionResults)[i]
                    console.log(ExamQuestionResults[i].Number_to_pull__c)
                }
                console.log("Getting Exam Question Info", ExamQuestionResults);
                component.set( "v.questionPool", ExamQuestionResults );
                //testvariable = ExamQuestionResults;
            }
            else {
                //User isn't signed in return to login
            }
        });
        $A.enqueueAction(getExamQuestions);
        console.log("Here" + testvariable)

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
