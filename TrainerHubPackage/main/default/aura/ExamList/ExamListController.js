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
    fetchData : function(component, event, helper) {
        component.set('v.columns',[
            
        ]);

        // get Hero Assessment data
        helper.fetchData(component);
    },
})
