({
    LoadCohorts : function(component) {

        let CohortInit = component.get("c.CohortsInit");

        CohortInit.setCallback(this, function(response){

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

        $A.enqueueAction(CohortInit);

    }
})