({
	//Grabbing the aggregate feedback scores for each hero
    selectHero : function(component, event, helper) {
        let hero = component.get("v.hero.Name");
        let action = component.get("c.grabAggHero");
        let action2 = component.get("c.grabFeedback");
        action.setParams({"name" : hero});
        action2.setParams({"name" : hero});
        action.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
                console.log(response.getReturnValue());
                //Checking if there is feedback or not
                if(response.getReturnValue() != ""){
                    component.set("v.isEmpty", true);
                    action2.setCallback(this,function(response2){
                       if(response2.getState() === "SUCCESS"){
                           component.set("v.allFeedback", response2.getReturnValue());
                           console.log(response2.getReturnValue());
                        }                 
                    });
                } 
                else 
                {component.set("v.checkValue", true);}
                
                component.set("v.heroAvgScores", response.getReturnValue());
                component.set("v.display", true);
                    
                
            }else{
                console.log("Problem receiving hero list");
            }
            
        });
        $A.enqueueAction(action);
        $A.enqueueAction(action2);
        
    }
})