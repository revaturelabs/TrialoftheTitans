/////////////////////////////////////////////////////
//
//  Name: Exam List Controller
//  Author: Josue Cisneros
//  Description: Client-side Controller for the Flagged
//               Hero List Component            
//
///////////////////////////////////////////////////

({
    fetchData : function(component, event, helper) {
        component.set('v.columns',[
            { label: 'Hero', fieldName: 'hero', type: 'text', initialWidth: 75 },
            { label: 'QC Flag Name', fieldName: 'Name', type: 'text', initialWidth: 130},
            { label: 'QC Week', fieldName: 'week', type: 'text', initialWidth: 100},
            { label: 'QC Score', fieldName: 'score', type: 'text', initialWidth: 100},
            { label: 'Type', fieldName: 'Type__c', type: 'text', initialWidth: 150},
            { label: 'Description', fieldName: 'Description__c', type: 'text', initialWidth: 700},
        ]);

        // get Hero Assessment data
        helper.fetchData(component);
    },
})