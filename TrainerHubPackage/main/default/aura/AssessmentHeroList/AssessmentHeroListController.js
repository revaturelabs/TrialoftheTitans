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
        component.set('v.columns',[
			{ label: 'View', type: 'button', initialWidth: 135, typeAttributes: { label: 'View Details', name: 'view_details', title: 'Click to View Details'}},
            { label: 'Hero', fieldName: 'hero', type: 'text'},
            { label: 'Assessment', fieldName: 'assessment', type: 'text'},
            { label: 'Overall Score', fieldName: 'Overall_Score__c', type: 'percentage'},
        ]);

        // get Hero Assessment data
        helper.fetchData(component);
    },

	//Function for selected rows
    updateSelected : function(component, event, helper){
        //get selected row logic
		var row = event.getParam('row');
        helper.showRowDetails(row, component, event);
    },
})