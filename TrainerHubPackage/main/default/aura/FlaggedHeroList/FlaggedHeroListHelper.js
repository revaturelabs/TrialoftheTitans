/////////////////////////////////////////////////////
//
//  Name: Exam List Helper
//  Author: Josue Cisneros
//  Description: Client-side JS Helper for the Flagged
//               Hero List component.                
//
///////////////////////////////////////////////////

({
    columnSetUp : function(component) {
        component.set('v.columns',[
            { label: 'Hero', fieldName: 'hero', type: 'text', initialWidth: 75 },
            { label: 'QC Flag Name', fieldName: 'Name', type: 'text', initialWidth: 130},
            { label: 'QC Week', fieldName: 'week', type: 'text', initialWidth: 100},
            { label: 'QC Score', fieldName: 'score', type: 'text', initialWidth: 100},
            { label: 'Type', fieldName: 'Type__c', type: 'text', initialWidth: 150},
            { label: 'Description', fieldName: 'Description__c', type: 'text', initialWidth: 700},
        ]);
    },

    // get Exam Results from the server
    fetchData : function(component) {
        let action = component.get("c.HeroList");
        action.setCallback(this, function (response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                //have the data in the server in a variable
                let heroData = response.getReturnValue();
                //for loop to set key for the coloumn with data
                for(let data of heroData) {
                    //if data retrieved is null place value stating it is null
                    //if not null place data in the key for the column
                    if(data.Account__c == null){
                        data.hero = "No Hero";
                    } else {
                        data.hero = data.Account__r.Name;
                    }
            
                    //if data retrieved is null place value stating it is null
                    //if not null place data in the key for the column
                    if(data.QC_Interview__c == null){
                        data.week = "No QC Inerview";
                    } else {
                        data.week = data.QC_Interview__r.Week__c;
                    }

                    //if data retrieved is null place value stating it is null
                    //if not null place data in the key for the column
                    if(data.QC_Interview__c == null){
                        data.score = "No QC Inerview";
                    } else {
                        data.score = data.QC_Interview__r.QC_Score__c;
                    }
                }
                //set the new data to the table
                component.set('v.data', heroData);
            } else if (state === "ERROR") {
                let errors = response.getError();
                if (errors && errors[0].message){
                    let showToast = $A.get("e.force:showToast");
                    showToast.setParams({
                        "message" : "Something went wrong!",
                        "type" : "error"
                    });
                    showToast.fire();
                }
            }
        });
        $A.enqueueAction(action);
    }
})