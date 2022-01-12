({
    // initialize table columns
    initColumns : function(component) {
        component.set("v.columns", 
            [
                {label:'Score', fieldName:'Score__c'},
                {label:'Question', fieldName:'Question__c'},
                {label:'Answer', fieldName:'Hero_Answer__c'},
            ]
        );
    },

    //initializes rows of flags
    createFlag : function (component) {
        let RowItemList = component.get("v.flagList");
        RowItemList.push({
            'sobjectType': 'QC_Flag__c',
            'Name': '',
            'Description': '',
        });
        component.set("v.flagList", RowItemList);
    },

    // validation for description on row save
    validateFlags: function(component) {
        let isValid = true;
        var flagRows = component.get("v.flagList");
        for (var index = 0; index < flagRows.length; index++) {
            if (flagRows[index].Description__c == '') {
                isValid = false;
                alert('Description required for Row ' + (index + 1));
            }
        }
        return isValid;
    },

    saveFlags : function(component) {
        // call validation helper to ensure flags all have description field filled
        if (this.validateFlags(component)) {
  
            let action = component.get("c.setFlags");
            action.setParams({
                flags: component.get("v.flagList")
            });

            action.setCallback(this, function(response) {
                let state = response.getState();
                if (state === "SUCCESS") {
                    // if response is success then reset/blank the 'contactList' Attribute 
                    // and call the common helper method for create a default Object Data to Contact List 
                    component.set("v.flagList", []);
                    helper.createFlag(component, event);
                    alert('Flags Saved');
                }
            });
            // enqueue the server side action  
            $A.enqueueAction(action);
        }
    },

    deleteFlag : function(component, event) {
        // get row to delete  
        let index = event.getParam("index");
        // get the flag list and remove the QC_Flag__c of index    
        let AllRowsList = component.get("v.flagList");
        AllRowsList.splice(index, 1);
        // set the flagList 
        component.set("v.flagList", AllRowsList);
    },
    
    // should handle getting params for insert and upsert of flags and interview
    setFlags : function(component) {
        let flags = component.get("v.flagList");

        flags.setParams({flags: component.get("v.flagList")});

        $A.enqueueAction(flags);
    },

    handleCreateFlag : function(component, event) {
        let name = event.getParam("flagName");
        let description = event.getParam("flagDescription");
        let type = event.getParam("flagType");

        component.set("v.newFlagName", name);
        component.set("v.newFlagDesc", description);
        component.set("v.newFlagType", type);
    },

    finalizeInterview : function(component) {
        let interview = component.get("c.setInterview");

        interview.setParams({interview: component.get("v.interviews")});

        $A.enqueueAction(interview);
    },
    
    LaunchStageEvent : function(component, stage){
        let StageEvent = component.getEvent("UpdateStageEvent");

        StageEvent.setParams("StageName", stage);

        StageEvent.fire();
    },

    SubmitInterview : function(component) {
        let HeroId = component.get("v.HeroId");
        let HeroName = component.get("v.HeroName");
        let CohortId = component.get("v.CohortId");
        let Week = component.get("v.Week");
        let HeroAnswers = component.get("v.answers");
        let newFlagName = component.get("v.newFlagName");
        let newFlagDesc = component.get("v.newFlagDesc");
        let newFlagType = component.get("v.newFlagType");

        let HeroAnswersStr = [];
        
        for (let hA of HeroAnswers) {
            HeroAnswersStr.push(JSON.stringify(hA));
        }

        let interviewSubmit = component.get("c.UploadInterviewData");
		
        interviewSubmit.setParams({"cohortId" : CohortId, "heroId" : HeroId,
                                    "heroName" : HeroName, "week" : Week, 
                                   "heroAnwerStrList" : HeroAnswersStr, 
                                   "fname": newFlagName, "fdesc": newFlagDesc, "ftype": newFlagType});

        interviewSubmit.setCallback(this, function(response){
            let state = response.getState();

            if (state === "SUCCESS") {
                let navService2 = component.find("navService2");
                let interviewFinalReference = {
                            type: 'standard__recordPage',
                            attributes: {
                                    actionName: 'view',
                                    recordId: response.getReturnValue()
                            },
                            state: {
                            }
    
                }
                navService2.navigate(interviewFinalReference);

            }
            
            else if (state === "ERROR") {
                let errors = response.getError();
                if (errors && errors[0].message){
                    let showToast = $A.get("e.force:showToast");
                    showToast.setParams({
                        "message" : "Something went wrong!",
                        "type" : "error"
                    });
                    showToast.fire();
                }
            }
        });
        
        $A.enqueueAction(interviewSubmit);
    }

})