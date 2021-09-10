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

    },

    setTitle : function(component, event) {

        let selectedOption = event.getParam("value");
        component.set("v.selectedTitle", selectedOption);

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