/////////////////////////////////////////////////////
//
//  Name: Assessment Hero List Helper
//  Author: Josue Cisneros
//  Description: Client-side JS Helper for the 
//               Assessment Hero List component.                
//
///////////////////////////////////////////////////

({
    // get Hero Assessment from the server
    fetchData : function(component) {
        component.set('v.columns',[
			{ label: 'View', type: 'button', initialWidth: 135, typeAttributes: { label: 'View Details', name: 'view_details', title: 'Click to View Details'}},
            { label: 'Hero', fieldName: 'hero', type: 'text'},
            { label: 'Assessment', fieldName: 'assessment', type: 'text'},
            { label: 'Overall Score', fieldName: 'Overall_Score__c', type: 'percentage'},
        ]);
        let action = component.get('c.SearchHeroList');
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
                    if(data[i].Hero__c == null){
                        data[i].hero = "No Hero";
                    } else{
                        data[i].hero = data[i].Hero__r.Name;
                    }
                }
                //for loop to set key for the coloumn with data
                for( let i=0; i< data.length; i++ ){
                    //if data retrieved is null place value stating it is null
                    //if not null place data in the key for the column
                    if(data[i].Assessment__c == null){
                        data[i].assessment = "No Assessment";
                    } else{
                        data[i].assessment = data[i].Assessment__r.Name ;
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
        let action = component.get("c.SearchHeroList");
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
                //for loop to set key for the coloumn with data
                for( let i=0; i< data.length; i++ ){
                    //if data retrieved is null place value stating it is null
                    //if not null place data in the key for the column
                    if(data[i].Hero__c == null){
                        data[i].hero = "No Hero";
                    } else{
                        data[i].hero = data[i].Hero__r.Name;
                    }
                }
                for( let i=0; i< data.length; i++ ){
                    //if data retrieved is null place value stating it is null
                    //if not null place data in the key for the column
                    if(data[i].Assessment__c == null){
                        data[i].assessment = "No Assessment";
                    } else{
                        data[i].assessment = data[i].Assessment__r.Name ;
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

	showRowDetails : function(row, cmp, event) {
        let cmpEvent  = cmp.getEvent("sendHeroAssessmentIdEvent");
        cmpEvent.setParam("AssessmentId", row.Id);
        
        cmpEvent.fire();
    },
})