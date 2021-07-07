/////////////////////////////////////////////////////
//
//  Name: NewProjectCreationHelper
//  Author: Steven Magnin
//  Description: JavaScript helper for New Project Creation Aura Component
//
///////////////////////////////////////////////////

({
    cancelCreate : function(component) {
        component.set("v.currentPage", "homePage");

    },

    doCreate : function(name, desc, component) {
        let setNewProject = component.get("c.setNewProject");
        let nameValid = component.find("nameInput").get("v.validity");

        setNewProject.setParams({"name" : name, "description" : desc });
                
        if(nameValid.valid){
            setNewProject.setCallback(this, function(response) {
                if(response.getState() === "SUCCESS") {
                    component.find("componentNotif").showToast({"Title" : "New Project Created!", "variant" : "success", 
                            "message" : "Project successfully created!"});

                    component.find("nameInput").set("v.value", "");
                    component.find("descInput").set("v.value", "");
                    component.set("v.currentPage", "homePage");

                }

            })

            $A.enqueueAction(setNewProject);

        }else {
        component.find('componentNotif').showNotice({"variant" : "error", "header" : "Project Exists", 
        "message" : "Project Name cannot be blank."});
        
        }

    },

    checkExistence : function(name, component) {
        let getListOfProjectNames = component.get("c.getListOfProjectNames");

        getListOfProjectNames.setCallback(this, function(response) {
            if(response.getState() === "SUCCESS") {
                let listOfProjectNames = JSON.parse(response.getReturnValue());
                console.log("And the name is: " + name);
                console.log(listOfProjectNames);

                for(let i = 0; i < listOfProjectNames.length; i++) {
                    if(listOfProjectNames[i] == name) {
                        console.log("Name Found");
                        component.find('componentNotif').showNotice({"variant" : "error", "header" : "Project Exists", 
                        "message" : "Project Name already exists. Please select another name."});

                    }

                }
    
            }

        })
        $A.enqueueAction(getListOfProjectNames);
        
        
        

        

    }

})
