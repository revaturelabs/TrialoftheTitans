({
	//Grabbing the aggregate feedback scores for each hero
    selectCohort : function(component, event, helper) {
        let cohort = component.get("v.hero.Name");
        let action = component.get("c.grabAggCohort");
        action.setParams({"name" : cohort});
        action.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
                console.log(response.getReturnValue());
                //Checking if there is feedback or not
                if(response.getReturnValue() != ""){
                    component.set("v.isEmpty", true);
                } 
                else 
                {component.set("v.checkValue", true);}
                
                component.set("v.cohortAvgScores", response.getReturnValue());
                component.set("v.display", true);
                    
                
            }else{
                console.log("Problem receiving feedback list");
            }
            
        });
        $A.enqueueAction(action);
        
    }
})