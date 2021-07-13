({
    hRenderSkills : function(component,event) {
        var renderSkills = component.getEvent("LandingSkillsEvent");
        renderSkills.setParams({
            "titanId" : component.get("{!v.activeTitan}")
        });
        renderSkills.fire();
    },
       hSetSkills : function(component, event, helper) {
        let activeTitan = component.get("v.activeTitan.Id");
          console.log("Active Titan Id: " + activeTitan);
        let skillsList = component.get("c.getSkills");
        skillsList.setParams({titanId : activeTitan});
        skillsList.setCallback(this, function(response){
            console.log(response.getState());
            if(response.getState() == "SUCCESS"){
                component.set("v.skillsList", response.getReturnValue());
                console.log("Returned Skills: ");
                console.log(response.getReturnValue());
            }
        })
        $A.enqueueAction(skillsList);
    },
})