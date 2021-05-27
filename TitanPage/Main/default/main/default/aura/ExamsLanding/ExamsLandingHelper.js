({
    hRenderExams : function(component,event) {
        var renderExams = component.getEvent("ExamsLandingEvent");
        renderExams.setParams({
            "titanId" : component.get("{!v.activeTitan}")
        });
        renderExams.fire();
    },
})