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
                let showToast = $A.get("e.force:showToast");
                if (errors) {
                    showToast.setParams({
                        "title": "ERROR",
                        "message": errors[0].message
                    })
                    showToast.fire();
                }
                else {
                    showToast.setParams({
                        "title": "ERROR",
                        "message": "Unknown error"
                    })
                    showToast.fire();
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