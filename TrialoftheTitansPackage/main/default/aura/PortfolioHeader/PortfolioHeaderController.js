({
    doInit : function(component, event, helper) {
        
        let method = component.get("c.getUserName");
        //method.setParams({inputString : 'hello'});
        method.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                let headerName ="<h2>" + response.getReturnValue() + "</h2>"; 
                component.set("v.userName", headerName);
            }
        });
        
        $A.enqueueAction(method);
        
        let titles = [];
        let titleList = [];

        let titleOne = "Salesforce Administrator"
        let titleTwo = "Salesforce Developer"
        let titleThree = "Apex Developer"
        
        
           titles.push(titleOne);
           titles.push(titleTwo);
           titles.push(titleThree);
       
       
        for(let i = 0; i < 3; i++) {

            let option = {
                "label" : titles[i],
                "value" : "<h3>" + titles[i] +"<h3>"
            };

            titleList.push(option);

        }
        
        component.set("v.titleList", titleList);

        // set up init for persisting the job name
        let jobmethod = component.get("c.getJob");
        jobmethod.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                if(response.getReturnValue() != null) {
                component.set("v.selectedTitle", response.getReturnValue());
                component.set("v.editMode", false);
                }
            }
        });
        
        $A.enqueueAction(jobmethod);

    },

    setTitle : function(component, event) {

        let selectedOption = event.getParam("value");
        component.set("v.selectedTitle", selectedOption);

        // set up init for persisting the job name
        let jobsetmethod = component.get("c.setJob");
        jobsetmethod.setParams({ job : component.get("v.selectedTitle") });
        jobsetmethod.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
              //  alert('set job')
            }
        });
        
        $A.enqueueAction(jobsetmethod);

    },

    setEdit : function(component) {

        let editMode = component.get("v.editMode");

        if(editMode == true) {

            component.set("v.editMode", false);

        }else {

            component.set("v.editMode", true);

        }

    }
})