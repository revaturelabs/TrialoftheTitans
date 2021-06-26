({
    //AssignExamHelper: Assigns the correct Exam that will be taken by the Hero
    //Gets this information from the TakeExamClickedEvent, which holds the Exam that will be taken
    assignExamHelper : function(component, event) {
        var exam = event.getParam("event");
        component.set("v.examName", exam); 

    },

    loadExamHelper : function(component){
        var getExam = component.get("c.examFinder");
        var examName = component.get("v.examName");
        getExam.setParams(
            {"examName" : examName}
        );

        getExam.setCallback(this, function(respone){
            if(respone.getState() === "SUCCESS"){
                var exam = respone.getReturnValue();
                console.log(exam);
            }
        })
    }
})
