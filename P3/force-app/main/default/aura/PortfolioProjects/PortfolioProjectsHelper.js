({
    // Onload, check to see if the user has projects and bring back any projects relevant to them
    showProjects : function(component,event){    
    var action = component.get("c.getProjects");        
    var currUser = $A.get("$SObjectType.CurrentUser.Id");
    console.log('Current user Id: ' + currUser);
    action.setParams({"userIdFromPage" : currUser});
    action.setCallback(this, function(response){
        component.set("v.projects", response.getReturnValue());
        
        //remove this
        console.log(response.getReturnValue());
        if(response.getReturnValue().length > 0){
            console.log('It worked!');
            component.set("v.isEmpty", false);
        } else {
            component.set("v.userId", currUser);
        }
    });
   
    
    $A.enqueueAction(action);
    
},


})