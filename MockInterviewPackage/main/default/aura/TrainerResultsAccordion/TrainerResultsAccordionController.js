({
	//function that shows list of heroes
    doinit : function(component, event, helper) {
        let action = component.get("c.grabHeroes");
        let action2 = component.get("c.grabCohorts");
        action.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.heroList", response.getReturnValue());
                console.log(response.getReturnValue());
            }else{
                console.log("Problem receiving hero list");
            }
            
        });
        action2.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.cohortList", response.getReturnValue());
                console.log(response.getReturnValue());
            }else{
                console.log("Problem receiving cohort list");
            }
            
        });
        $A.enqueueAction(action);	
        $A.enqueueAction(action2);
	}
    
    
})