/////////////////////////////////////////////////////
//
//  Name: Exam List Controller
//  Author: Josue Cisneros
//  Description: Client-side Controller for the Exam
//               List Component            
//
///////////////////////////////////////////////////

({
    //get Exam Result data and set the columns of the datatable
    fetchData : function(component, helper) {
        component.set('v.columns',[
            { label: 'Hero', fieldName: 'hero', type: 'text'},
            { label: 'Exam Name', fieldName: 'exam', type: 'text'},
            { label: 'Score', fieldName: 'Score__c', type: 'percentage'},
            { label: 'Total Correct', fieldName: 'Total_Correct__c', type: 'number'},
            { label: 'Total Answer', fieldName: 'Total_Answers__c', type: 'number'},
        ]);

        // get Hero Assessment data
        helper.fetchData(component);
    },

    //get list of data by searching hero names
    search : function(component, helper) {
        helper.search(component);
    },
})