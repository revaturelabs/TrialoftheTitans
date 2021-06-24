({
    hRenderExams : function(component,event) {
        var renderExams = component.getEvent("ExamsLandingEvent");
        renderExams.setParams({
            "titanId" : component.get("{!v.activeTitan}")
        });
        renderExams.fire();
    },
    
      hSetExams : function(component, event, helper) {
        let activeTitan = component.get("v.activeTitan.Id");
          console.log("Active Titan Id: " + activeTitan);
        let examsList = component.get("c.getExams");
        examsList.setParams({titanId : activeTitan});
        examsList.setCallback(this, function(response){
            if(response.getState() == "SUCCESS"){
                component.set("v.examsList", response.getReturnValue());
                console.log("Returned Exams: ");
                console.log(response.getReturnValue());
            }
        })
        $A.enqueueAction(examsList);
    },
})