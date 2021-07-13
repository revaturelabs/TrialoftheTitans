({
    // ***CURRENTLY NOT IN USE***
    getInterview : function(component, event) {
        var interviews = component.get("c.getInterview")
        interviews.setParams({cohort: event.getParam(NEEDCOHORTPARAMSET),
                                hero: event.getParam(NEEDHEROPARAMSET)})

                    // get event handler set from cohort select component
                                // Reference: ^possibly just hero set
                                // var.setParams({param: component.find('table').getSelectedRows()[0],
                                // param2: component.find('aura:id').get("v.value")})

        interviews.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.interview", response.getReturnValue())
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        })
        $A.enqueueAction(interviews)
    },

    //initializes row 1 of flags
    createFlag : function (component, event) {
        var RowItemList = component.get("v.flagList");
        RowItemList.push({
            'sobjectType': 'QC_Flag__c',
            'Name': '',
            'Description': '',
        })
        component.set("v.flagList", RowItemList);
    },

    // validation for requiring description on row save
    validateFlags: function(component, event) {
        var isValid = true;
        var flagRows = component.get("v.flagList");
        for (var index = 0; index < flagRows.length; index++) {
            if (flagRows[index].Description__c == '') {
                isValid = false;
                alert('Description required for Row ' + (index + 1));
            }
        }
        return isValid;
    },

    
    // should handle getting params for insert and upsert of flags and interview
    setFlags : function(component, event) {
        var flags = component.get("v.flagList")

        flags.setParams({flags: component.get("v.flagList")})

        $A.enqueueAction(flags)
    },

    finalizeInterview : function(component, event) {
        var interview = component.get("c.setInterview")

        interview.setParams({interview: component.get("v.interviews")})

        $A.enqueueAction(interview)
    },
    
    LaunchStageEvent : function(component, stage){
        let StageEvent = component.getEvent("UpdateStageEvent");
        StageEvent.setParams("StageName", stage);
        StageEvent.fire();
    },

    SubmitInterview : function(component, HeroId, HeroName, CohortId, Week, HeroAnswers, Flags, newFlagName, newFlagDesc, newFlagType){
        
        console.log("SubmitInterview helper");

        console.log(HeroId);
        console.log(HeroName);
        console.log(CohortId);
        console.log(Week);
        console.log(HeroAnswers);
        


        var HeroAnswersStr = [];
        
        console.log(HeroAnswersStr);

        
        for (let hA of HeroAnswers){
            HeroAnswersStr.push(JSON.stringify(hA));
        }
        
		console.log("Something");
        console.log(HeroAnswersStr);
        
        /*
        var FlagsStr = [];
		console.log(Flags.length);
        if (Flags.length != 0){
            console.log("Stuff");
        	for (let f of Flags){
            	FlagsStr.push(JSON.stringify(f));
        	}
        }
        */
        
        console.log("Stringification complete");

        let interviewSubmit = component.get("c.UploadInterviewData");
		
        console.log("REFERENCE RETRIEVED");
        let FlagsStr = "";
        interviewSubmit.setParams({"cohortId" : CohortId, "heroId" : HeroId,
                                    "heroName" : HeroName, "week" : Week, 
                                   "qaStrList" : HeroAnswersStr, "qaStrFlags" : FlagsStr, 
                                   "fname":newFlagName, "fdesc": newFlagDesc, "ftype": newFlagType});

        console.log("PARAMETERS SET");

        interviewSubmit.setCallback(this, function(response){
            
            let state = response.getState();

            if (state === "SUCCESS"){
                console.log(state);
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
            
            else if (state === "INCOMPLETE"){
                console.log(state);

            }

            else if (state === "ERROR"){
                console.log(state);
                var errors = response.getError();

                if (errors) {
                    if (errors[0] && errors[0].message){
                        console.log("Error message: " + errors[0].message);

                    }

                }
                else {
                    console.log("Unknown error");

                }

            }
        });
        console.log("ENQUEUEING ACTION...");
        $A.enqueueAction(interviewSubmit);
        console.log("ACTION ENQUEUED.");
    }

})