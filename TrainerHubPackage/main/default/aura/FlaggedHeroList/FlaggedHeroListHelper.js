/////////////////////////////////////////////////////
//
//  Name: Exam List Helper
//  Author: Josue Cisneros
//  Description: Client-side JS Helper for the Flagged
//               Hero List component.                
//
///////////////////////////////////////////////////

({
    // get Exam Results from the server
    fetchData : function(component) {
        var action = component.get('c.HeroList');
        action.setCallback(this, (function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //have the data in the server in a variable
                var data = response.getReturnValue();
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
                    if(data[i].QC_Interview__c == null){
                        data[i].week = "No QC Inerview";
                    } else{
                        data[i].week = data[i].QC_Interview__r.Week__c;
                    }
                }
                //for loop to set key for the coloumn with data
                for( let i=0; i< data.length; i++ ){
                    //if data retrieved is null place value stating it is null
                    //if not null place data in the key for the column
                    if(data[i].QC_Interview__c == null){
                        data[i].score = "No QC Inerview";
                    } else{
                        data[i].score = data[i].QC_Interview__r.QC_Score__c;
                    }
                }
                //set the new data to the table
                component.set('v.data', data);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
})