({
    
    //Get project details from the Apex controller
    //Currently sending viewer user Id to the server as param, but this may need to change
    getProjects : function(component,event){
        var action = component.get("c.getDetails");
        var currUser = $A.get("$SObjectType.CurrentUser.Id");
        action.setParams({"userIdFromPage" : currUser});
        action.setCallback(this, function(response){
            component.set("v.wrapRecord", response.getReturnValue());
        });
        
        $A.enqueueAction(action);
        
    }
    
})