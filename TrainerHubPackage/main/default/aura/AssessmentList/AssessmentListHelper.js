/////////////////////////////////////////////////////
//
//  Name: Assessment Hero List Helper
//  Author: Josue Cisneros
//  Description: Client-side JS Helper for the 
//               Assessment List component.                
//
///////////////////////////////////////////////////

({
    // get Assessment from the server
    fetchData : function(component) {
        var action = component.get('c.AssessmentList');
        action.setCallback(this, (function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.data', response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },

    //write comment here
    updateSelected : function(component){

    },
})
