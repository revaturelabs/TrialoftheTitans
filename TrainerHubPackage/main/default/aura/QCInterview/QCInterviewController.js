/////////////////////////////////////////////////////
//
//  Name: Exam List Controller
//  Author: Josue Cisneros
//  Description: Client-side Controller for the QC
//               Interview Component            
//
///////////////////////////////////////////////////

({
    fetchData : function(component, event, helper) {
        component.set('v.columns',[
            { label: 'QC Interview', fieldName: 'Name', type: 'text', initialWidth: 150},
            { label: 'Hero', fieldName: 'hero', type: 'text', initialWidth: 75 },
            { label: 'QC Week', fieldName: 'Week__c', type: 'text', initialWidth: 100},
            { label: 'QC Score', fieldName: 'QC_Score__c', type: 'text', initialWidth: 100},
        ]);

        // get Hero Assessment data
        helper.fetchData(component);
    },
})