({

    getAllData : function(component, event, helper){
        let action = component.get("c.getData");

        action.setCallback(this, function(response){

            let state = response.getState();
            console.log(state);
            if (state == "SUCCESS"){
                
                var data = response.getReturnValue();
                //console.log("### data = "+JSON.stringify(data));
                component.set("v.data", data); 
                component.set("v.weeks", data.setWeeks);
                component.set("v.allQuestionDeckWithQuestions", data.allQuestionDeckWithQuestions);
                /*var heroMap = [];
                for ( var key in data.mapCohortNameVsWrapper ) {
                    heroMap.push({value:data.mapCohortNameVsWrapper[key], key:key});
                }
                console.log("### heroMap = "+ JSON.stringify(heroMap));
                component.set("v.heroMap", heroMap)*/

            }
            
            else if (state == "INCOMPLETE"){
                console.log(state);

            }

            else if (state == "ERROR"){
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

        $A.enqueueAction(action);
    },

    // Load a list of all currently active cohorts (on init)
    LoadCohorts : function(component) {

        let CohortListInit = component.get("c.RetrieveCohorts");

        CohortListInit.setCallback(this, function(response){

            let state = response.getState();

            if (state == "SUCCESS"){
                console.log(state);
                var cohorts = response.getReturnValue();
                component.set("v.CohortList", cohorts);

            }
            
            else if (state == "INCOMPLETE"){
                console.log(state);

            }

            else if (state == "ERROR"){
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

        $A.enqueueAction(CohortListInit);

    },




    // Load data for a specific cohort (launched by UpdateCohort function in main JS controller,
    // which is triggered by UpdateCohortEvent from CohortButtons component when a cohort is selected)
    LoadCohortData : function(component, selectedCohort){
        console.log("Cohort data helper");
        let CohortInit = component.get("c.RetrieveCohortData");
        console.log(JSON.stringify(selectedCohort));
        CohortInit.setParams({cohortStr : JSON.stringify(selectedCohort)});

        CohortInit.setCallback(this, function(response){

            let state = response.getState();

            if (state == "SUCCESS"){
                console.log(state);
                let cohortData = response.getReturnValue();
                console.log(cohortData);
                component.set("v.SelectedCohort", cohortData);
                component.set("v.SquadList", cohortData.squadList);
            }
            
            else if (state == "INCOMPLETE"){
                console.log(state);

            }

            else if (state == "ERROR"){
                console.log(state);
                let errors = response.getError();

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
        $A.enqueueAction(CohortInit);
    },


    LaunchInterview : function(component){
        let navService = component.find("navService");
        let interviewReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__QCInterview'

            },
            state: {
                c__Cohort: component.get("v.SelectedCohort"),
                c__CohortId: "6712345"
            }
    
        }
        //console.log(JSON.stringify(interviewReference));
        //console.log(JSON.stringify(component.get("v.SelectedCohort")));
        sessionStorage.setItem('ActiveCohort', JSON.stringify(component.get("v.SelectedCohort")));
        navService.navigate(interviewReference);

    }

})