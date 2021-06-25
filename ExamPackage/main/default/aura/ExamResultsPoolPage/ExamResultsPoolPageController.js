({
    doInit : function(component, event, helper) {
        let getExamPoolQuestions = component.get("c.getExamResultPools");

        getExamPoolQuestions.setCallback( this, function( response ) {
            if( response.getState() === "SUCCESS" ){
                var pool = [];
                const  AllExamPoolQuestions = response.getReturnValue();
     
                console.log("Getting Exam Question Info",  AllExamPoolQuestions);
                component.set( "v.questionPool",  AllExamPoolQuestions );
                component.set( "v.correctpoollist",  AllExamPoolQuestions );
            }
            else {
                console.log('No Pools in this Exam')
            }
        });
        $A.enqueueAction(getExamPoolQuestions);

    },

    poolEvent : function(component, event, helper){
        let getCorrectAnswerPool = component.get("c.getExamResultAnswers");
        //create an object to count frequency through key/value pairs
        
        getCorrectAnswerPool.setCallback( this, function( response ) {
            if( response.getState() === "SUCCESS" ){
                let resetPool = component.get("v.correctpoollist")
                const CorrectAnswerPool = response.getReturnValue();
                component.set( "v.questionPool",  resetPool);

               helper.correctExamPoolQuestionsMapped(component, CorrectAnswerPool);

            }
            else {
                console.log('No correct answers in a pool')
            }
        });
        $A.enqueueAction(getCorrectAnswerPool);
        helper.ExamPoolFormToggle(component, event, helper);
    },
    
   /*navigater : function(component, event, helper){

        console.log('hit');
        const page = event.getParam('page');
        console.log(page);
        component.set("v.navigate", page);

    },*/

})
