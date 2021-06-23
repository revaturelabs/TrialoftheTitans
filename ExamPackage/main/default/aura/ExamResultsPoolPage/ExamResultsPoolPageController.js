({
    doInit : function(component, event, helper) {
        let getExamQuestions = component.get("c.getExamResultPools");
        getExamQuestions.setCallback( this, function( response ) {
            if( response.getState() === "SUCCESS" ){
                const ExamQuestionResults = response.getReturnValue();
                console.log("Getting Exam Question Info", ExamQuestionResults);
                component.set( "v.questionPool", ExamQuestionResults );
            }
            else {
                //User isn't signed in return to login
            }
        });
        $A.enqueueAction( getExamQuestions );

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
