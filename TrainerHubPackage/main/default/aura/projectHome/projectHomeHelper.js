({
    projectList:[],
    
    retrieveAndDisplayProjectList : function(component) {
        var action = component.get("c.retrieveProjects");
        action.setCallback(this,function(response){
            let responseState = response.getState();
            if(responseState == "SUCCESS"){
                this.projectList = response.getReturnValue();
                component.set("v.projectList", this.projectList);
            }else if(responseState == "ERROR"){
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        component.set("v.errorMessage",errors[0].message );
                    }else {
                        component.set("v.errorMessage","Unknown error :(" );
                    }
                }
            }
        });
        $A.enqueueAction(action);
    }
})