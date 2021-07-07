({
    cancelCreate : function(component) {
        let showCreateComponent = component.get("v.displayNewProjectCreation");
        let showHomeComponent = component.get("v.displayProjectList");

        if(showCreateComponent == true){
            if(showHomeComponent == false) {
                component.set("v.displayNewProjectCreation", false);
                //component.set("v.displayProjectList", true);

            }

        }

    },

    doCreate : function(name, desc, component) {
        let showCreateComponent = component.get("v.displayNewProjectCreation");
        let showHomeComponent = component.get("v.displayProjectList");
        let setNewProject = component.get("c.setNewProject");

        setNewProject.setParams({"name" : name, "description" : desc });

        setNewProject.setCallback(this, function(response) {
            if(response.getState() === "SUCCESS") {
                component.find('errorNotif').showToast({"Title" : "New Project Created!", "variant" : "success", 
                        "message" : "Project successfully created!"});

                component.find("nameInput").set("v.value", "");
                component.find("descInput").set("v.value", "");

                if(showCreateComponent == true){
                    if(showHomeComponent == false) {
                        component.set("v.displayNewProjectCreation", false);
                        //component.set("v.displayProjectList", true);
                        
                    }
        
                }

            }

        })

        $A.enqueueAction(setNewProject);

    },

    checkExistence : function(name, component) {
        let getListOfProjectNames = component.get("c.getListOfProjectNames");

        getListOfProjectNames.setCallback(this, function(response) {
            if(response.getState() === "SUCCESS") {
                let listOfProjectNames = JSON.parse(response.getReturnValue());

                for(var i = 0; i < listOfProjectNames.length; i++) {
                    if(listOfProjectNames[i] == name) {
                        component.find('errorNotif').showNotice({"variant" : "error", "header" : "Project Exists", 
                        "message" : "Project Name already exists. Please select another name."});

                    }
        
                }

            }

            

        })
        $A.enqueueAction(getListOfProjectNames);
        
        
        

        

    }

})
