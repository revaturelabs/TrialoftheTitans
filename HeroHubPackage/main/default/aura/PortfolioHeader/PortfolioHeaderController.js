({
    doInit : function(component, event, helper) {

        //let headerName = "<h2>" + "c.getUserName" + "</h2>"; Will be used when controller is written.
        let headerNameTemp = "<h2>" + "USER NAME" + "</h2>"; //temporary username, need Apex controller to retrieve actual name.

        //temporary loop to make mock titles to populate picklist. Should be retrieved from server in actual implementation.
        let titleList = [];
        for(let i = 0; i < 10; i++) {

            let option = {
                "label" : "Temp Title " + i,
                "value" : "Temp Title " + i.toString()
            };

            titleList.push(option);

        }

        component.set("v.userName", headerNameTemp); //change to headerName after Apex controller is made.
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
