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
        // get Hero Assessment data
        helper.columnSetUp(component);
        helper.fetchData(component);
    },
})