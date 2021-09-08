({
    // ***CURRENTLY NOT IN USE***
    
    //initializes row 1 of flags
    createFlag : function (component, event) {
        let RowItemList = component.get("v.flagList");
        RowItemList.push({
            'sobjectType': 'QC_Flag__c',
            'Name': '',
            'Description': '',
        })
        component.set("v.flagList", RowItemList);
    },

    // validation for requiring description on row save
    validateFlags: function(component, event) {
        let isValid = true;
        let flagRows = component.get("v.flagList");
        for (let index = 0; index < flagRows.length; index++) {
            if (flagRows[index].Description__c == '') {
                isValid = false;
                alert('Description required for Row ' + (index + 1));
            }
        }
        return isValid;
    },

    
    // should handle getting params for insert and upsert of flags and interview
    setFlags : function(component, event) {
        let flags = component.get("v.flagList")

        flags.setParams({flags: component.get("v.flagList")})

        $A.enqueueAction(flags)
    },

    finalizeInterview : function(component, event) {
        let interview = component.get("c.setInterview")

        interview.setParams({interview: component.get("v.interviews")})

        $A.enqueueAction(interview)
    },
    
    LaunchStageEvent : function(component, stage){
        let StageEvent = component.getEvent("UpdateStageEvent");
        StageEvent.setParams("StageName", stage);
        StageEvent.fire();
    },

    SubmitInterview : function(component){
        let HeroId = component.get("v.HeroId");
        let HeroName = component.get("v.HeroName");
        let CohortId = component.get("v.CohortId");
        let Week = component.get("v.Week");
        let HeroAnswers = component.get("v.answers");
        let Flags = component.get("v.flagList");
        let newFlagName = component.get("v.newFlagName");
        let newFlagDesc = component.get("v.newFlagDesc");
        let newFlagType = component.get("v.newFlagType");
           


        let HeroAnswersStr = [];
        
               
        for (let hA of HeroAnswers){
            HeroAnswersStr.push(JSON.stringify(hA));
        }
        
		
        
       
        
        

        let interviewSubmit = component.get("c.UploadInterviewData");
		        
        let FlagsStr = "";
        interviewSubmit.setParams({"cohortId" : CohortId, "heroId" : HeroId,
                                    "heroName" : HeroName, "week" : Week, 
                                   "qaStrList" : HeroAnswersStr, "qaStrFlags" : FlagsStr, 
                                   "fname":newFlagName, "fdesc": newFlagDesc, "ftype": newFlagType});

       

        interviewSubmit.setCallback(this, function(response){
            
            let state = response.getState();

            if (state === "SUCCESS"){
              
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
        
            else if (state === "ERROR"){
                let errors = response.getError();

                if (errors) {
                    if (errors[0] && errors[0].message){
                        console.log("Error message: " + errors[0].message);

                    }

                }

            }
        });
         $A.enqueueAction(interviewSubmit);
        
    }, handleCreateFlag: function(component, event){
       
        let name = event.getParam("flagName");
        let description = event.getParam("flagDescription");
        let type = event.getParam("flagType");
        component.set("v.newFlagName", name);
        component.set("v.newFlagDesc", description);
        component.set("v.newFlagType", type);

    },  deleteRow: function (component, event) {
           // get row to delete  
        let index = event.getParam("index");
        // get the flag list and remove the QC_Flag__c of index    
        let AllRowsList = component.get("v.flagList");
        AllRowsList.splice(index, 1);
        // set the flagList 
        component.set("v.flagList", AllRowsList);

        
    }, saveFlags: function (component, event) {

        if (this.validateFlags(component, event)) {
  
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
                    this.createFlag(component, event);
                    alert('Flags Saved');
                }
            });
            // enqueue the server side action  
            $A.enqueueAction(action);
        }
        
        
    }, createFlagColumns: function (component) {
        component.set("v.columns", 
            [
                {label:'Score', fieldName:'Score__c'},
                {label:'Question', fieldName:'Question__c'},
                {label:'Answer', fieldName:'Hero_Answer__c'},
            ]
        );
    }

})