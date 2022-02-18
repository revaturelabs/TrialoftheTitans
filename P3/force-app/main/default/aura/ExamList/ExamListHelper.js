/////////////////////////////////////////////////////
//
//  Name: Exam List Helper
//  Author: Josue Cisneros
//  Description: Client-side JS Helper for the Exam
//               List component.                
//
///////////////////////////////////////////////////

({
    // get Exam Results from the server
    fetchData : function(component) {
        component.set('v.columns',[
            { label: 'Hero', fieldName: 'hero', type: 'text'},
            { label: 'Exam Name', fieldName: 'exam', type: 'text'},
            { label: 'Score', fieldName: 'Score__c', type: 'percentage'},
            { label: 'Total Correct', fieldName: 'Total_Correct__c', type: 'number'},
            { label: 'Total Answer', fieldName: 'Total_Answers__c', type: 'number'},
        ]);
        let action = component.get('c.SearchExamList');
		let cohortId = component.get('v.CohortId');
		action.setParams({
			"cohortId": cohortId
        });
        action.setCallback(this, (function (response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                //have the data in the server in a variable
                let data = response.getReturnValue();
                //for loop to set key for the coloumn with data
                for( let i=0; i< data.length; i++ ){
                    //if data retrieved is null place value stating it is null
                    //if not null place data in the key for the column
                    if(data[i].Account__c == null){
                        data[i].hero = "No Hero";
                    } else{
                        data[i].hero = data[i].Account__r.Name;
                    }
                }
                //for loop to set key for the coloumn with data
                for( let i=0; i< data.length; i++ ){
                    //if data retrieved is null place value stating it is null
                    //if not null place data in the key for the column
                    if(data[i].Exam__c == null){
                        data[i].exam = "No Exam";
                    } else{
                        data[i].exam = data[i].Exam__r.Name;
                    }
                }
                //set the new data to the table
                component.set('v.data', data);
            } else if (state === "ERROR") {
                let errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },

    //get specific search from server
    search : function(component){
        //variable stores the user input
        let searchKey = component.find("searchKey").get("v.value");
        let action = component.get("c.SearchExamList");
		let cohortId = component.get('v.CohortId');
        //set the variable for the method parameters
        action.setParams({
            "searchKey": searchKey,
			"cohortId": cohortId
        });
        action.setCallback(this, (function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                //have the data in the server in a variable
                let data = response.getReturnValue();
                //for loop to set key for the coloumn with data
                for( let i=0; i< data.length; i++ ){
                    //if data retrieved is null place value stating it is null
                    //if not null place data in the key for the column
                    if(data[i].Account__c == null){
                        data[i].hero = "No Hero";
                    } else{
                        data[i].hero = data[i].Account__r.Name;
                    }
                }
                //for loop to set key for the coloumn with data
                for( let i=0; i< data.length; i++ ){
                    //if data retrieved is null place value stating it is null
                    //if not null place data in the key for the column
                    if(data[i].Exam__c == null){
                        data[i].exam = "No Exam";
                    } else{
                        data[i].exam = data[i].Exam__r.Name;
                    }
                }
                //set the new data to the table
                component.set('v.data', data);
            } else if (state === "ERROR") {
                let errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
})