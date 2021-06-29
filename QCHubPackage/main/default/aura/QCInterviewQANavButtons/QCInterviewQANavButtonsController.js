({
    NextQuestion : function(component, event, handler){
        console.log("Next Question Button Event Firing");
        let NextQuestionEvent = component.getEvent("v.NextQuestionEvent");
        NextQuestionEvent.fire();
    }
})
