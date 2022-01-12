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
        // get Hero Assessment data
        helper.fetchData(component);
    },

    //get list of data by searching hero names
    search : function(component, helper) {
        helper.search(component);
    },
})