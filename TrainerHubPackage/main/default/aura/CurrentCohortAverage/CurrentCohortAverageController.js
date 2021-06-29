/////////////////////////////////////////////////////
// 
//  Name: CurrentCohortAverageController
//  Author: Kameron Fincher
//  Description: Main controller for the current cohort 
//	main view. Display Qc Scores, Exams, and Hero   
//	Assessments
//	
///////////////////////////////////////////////////
({
	Init : function(component, event, helper){
        var action = component.get('c.getData');
        
        action.setCallback(this, (function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //have the data in the server in a variable
                var data = response.getReturnValue();
                console.log(data[0].value);
                helper.Chart(component,event,data);
            }
        }))
        
        $A.enqueueAction(action);
    },
})