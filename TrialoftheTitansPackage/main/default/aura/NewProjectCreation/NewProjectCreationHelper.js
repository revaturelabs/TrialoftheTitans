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
            //If name is not blank, try to insert record.
            setNewProject.setCallback(this, function(response) {
                if(response.getState() === "SUCCESS") {
                    //If no errors are returned, display toast to let user know record has been inserted.
                    component.find("componentNotif").showToast({"Title" : "New Project Created!", "variant" : "success", 
                            "message" : "Project successfully created!"});
                    //Blank input fields.
                    component.find("nameInput").set("v.value", "");
                    component.find("descInput").set("v.value", "");
                    //Redirect to homepage.
                    component.set("v.currentPage", "homePage");
                    setTimeout(function() {
                        window.location.reload();//reload page

                  }, 1500);

                }

            })

            $A.enqueueAction(setNewProject);

        }else {
            //If Project Name field is blank, display error.
            component.find('componentNotif').showNotice({"variant" : "error", "header" : "Project Exists", 
                "message" : "Project Name cannot be blank."});
        
        }

    },

    checkExistence : function(name, component) {
        let getListOfProjectNames = component.get("c.getListOfProjectNames");

        getListOfProjectNames.setCallback(this, function(response) {
            if(response.getState() === "SUCCESS") {
                //If no errors are returned, parse returned JSON to array of strings.
                let listOfProjectNames = JSON.parse(response.getReturnValue());

                //Iterate list of names and check for matches against passed-in name from Project Name input field.
                for(let i = 0; i < listOfProjectNames.length; i++) {
                    if(listOfProjectNames[i] == name) {
                        component.find('componentNotif').showNotice({"variant" : "error", "header" : "Project Exists", 
                        "message" : "Project Name already exists. Please select another name."});

                    }

                }
    
            }

        })
        $A.enqueueAction(getListOfProjectNames);
        
    }

})
