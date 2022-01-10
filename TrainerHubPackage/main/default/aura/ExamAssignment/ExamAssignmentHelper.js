({
    fetchAllExams : function(component) {
        var action = component.get("c.getExams");
        action.setParams({cohortId : component.get("v.CohortId")});

        action.setCallback(this, function(Response) {
            var state = Response.getState();
            if (state === "SUCCESS") {
                var returnValue = Response.getReturnValue();
                component.set('v.examData', returnValue);
                console.log(returnValue);
            }
            else if (state === "INCOMPLETE") {

            }
                else if (state === "ERROR") {
                    var errors = Response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + errors[0].message);
                        }
                    }
                    else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    }
})