({
    projectList:[],
    
    retrieveAndDisplayProjectList : function(component) {
        let action = component.get("c.retrieveProjects");
        action.setCallback(this,function(response){
            let responseState = response.getState();
            if(responseState == "SUCCESS"){
                this.projectList = response.getReturnValue();
                component.set("v.projectList", this.projectList);
            }else if(responseState == "ERROR"){
                let errors = response.getError();
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
    },
    edit: function(component, event) {
        component.set("v.selectedProjId", event.target.id)
        component.set("v.currentPage", "dynamicRow");
    },
    assign: function(component, event) { 
        component.set("v.selectedProjId", event.target.id);     
        component.set("v.currentPage", "AssignProject");
    },
    
    addNewProject: function(component) {
        component.set("v.currentPage", "NewProjectCreation");
    },
})