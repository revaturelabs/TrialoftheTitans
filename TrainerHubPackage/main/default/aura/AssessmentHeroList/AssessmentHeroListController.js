/////////////////////////////////////////////////////
//
//  Name: Assessment Hero List Controller
//  Author: Josue Cisneros
//  Description: Client-side Controller for the 
//               Assessment Hero List Component            
//
///////////////////////////////////////////////////

({
    //get Hero Assessment data and set the columns of the datatable
    fetchData : function(component, event, helper) {
        // get Hero Assessment data
        helper.fetchData(component);
    },

    //get list of data by searching hero names
    search : function(component, event, helper) {
        helper.search(component);
    },

	//Function for selected rows
    updateSelected : function(component, event, helper){
        //get selected row logic
		let row = event.getParam('row');
        helper.showRowDetails(row, component, event);
    },
})