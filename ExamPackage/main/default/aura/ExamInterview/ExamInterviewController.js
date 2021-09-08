({
    assignExam : function(component, event, helper){
        helper.assignExamHelper(component, event);
    },
    
    loadExamQuestions : function(component, event, helper) {
        helper.loadExamHelper(component);
    },

    nextClick : function(component, event, helper) {
        helper.navigateToNextQuestionHelper(component);
    },

    prevClick : function(component, event, helper){
        helper.navigateToPrevQuestionHelper(component);
    },

    submitClick : function(component, event, helper){
        helper.submitExam(component);
    },

    //this can probably be commented out
    setTitan : function(component, event, helper){
        helper.setTitanHelper(component, event);
    }

    
})
