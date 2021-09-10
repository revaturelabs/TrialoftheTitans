({
    //We used this to make use of the controller and the method we used to load data 
    //before we wrapped it all in a overall container for the Exam.
    loadQuestion : function(component, event, helper) {
        helper.loadQuestionHelper(component);

    },
    answer : function(cmp) {
        var answer = cmp.find("input").get("v.value");
        return answer;
    }
})
