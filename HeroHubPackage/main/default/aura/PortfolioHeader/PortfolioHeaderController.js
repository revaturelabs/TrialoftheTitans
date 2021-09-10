({
    doInit : function(component, event, helper) {

        let headerName = "<h2>" + "c.getUserName" + "</h2>"; 
        //let headerNameTemp = "<h2>" + "USER NAME" + "</h2>"; //temporary username, need Apex controller to retrieve actual name.

        let titleOne = "<h3>"+"Salesforce Administrator"+"</h3>"
        let titleTwo = "<h3>"+"Salesforce Developer"+"</h3>"
        let titleThree = "<h3>"+"Apex Developer"+"</h3>"
        
        let titleList = [];
           titleList.add('Salesforce Developer');
           titleList.add('Salesforce Administrator');
           titleList.add('Apex Developer');
       
       
       // for(let i = 0; i < 10; i++) {

       //     let option = {
       //         "label" : "Temp Title " + i,
       //         "value" : "Temp Title " + i.toString()
       //     };

       //     titleList.push(option);

       // }

        component.set("v.userName", headerName); //change to headerName after Apex controller is made.
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
