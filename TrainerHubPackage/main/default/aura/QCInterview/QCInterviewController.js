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
            { label: 'QC Interview', fieldName: 'Name', type: 'text'},
            { label: 'Hero', fieldName: 'hero', type: 'text'},
            { label: 'QC Week', fieldName: 'Week__c', type: 'text'},
            { label: 'QC Score', fieldName: 'QC_Score__c', type: 'text'},
        ]);

        // get Hero Assessment data
        helper.fetchData(component);
    },
})