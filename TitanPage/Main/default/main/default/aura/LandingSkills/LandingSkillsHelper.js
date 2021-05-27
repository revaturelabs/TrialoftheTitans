({
    hRenderSkills : function(component,event) {
        var renderSkills = component.getEvent("LandingSkillsEvent");
        renderSkills.setParams({
            "titanId" : component.get("{!v.activeTitan}")
        });
        renderSkills.fire();
    },
})