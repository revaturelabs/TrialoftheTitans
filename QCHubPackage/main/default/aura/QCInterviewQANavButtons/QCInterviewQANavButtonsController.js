({
    NextQuestion : function(component, event, handler){
        let NextQuestionEvent = component.getEvent("v.NextQuestionEvent");
        NextQuestionEvent.fire();
    }
})
