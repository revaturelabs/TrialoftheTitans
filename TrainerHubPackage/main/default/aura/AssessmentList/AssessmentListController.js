/////////////////////////////////////////////////////
//
//  Name: Assessment List Controller
//  Author: Josue Cisneros
//  Description: Client-side Controller for the Exam
//               Assessment List Component            
//
///////////////////////////////////////////////////

({
    //get Assessment data and set the columns of the datatable
    fetchData : function(component, event, helper) {
        component.set('v.columns',[
			{ label: 'View', type: 'button', initialWidth: 135, typeAttributes: { label: 'View Details', name: 'view_details', title: 'Click to View Details'}},
            { label: 'Name', fieldName: 'Name', type: 'text'},
            { label: 'Type', fieldName: 'Type__c', type: 'text'},

        ]);

        // get Assessment data
        helper.fetchData(component);

    },

    //Function for selected rows
    updateSelected : function(component, event, helper){
        //get selected row logic
		var row = event.getParam('row');
        helper.showRowDetails(row, component, event);
    },

	handleReturnComponentEvent : function(cmp, event, helper) {
        helper.handleReturnComponentEvent(cmp, event);
    },


	handleReturnAssessmentIdEvent : function(cmp, event, helper) {
        helper.handleReturnAssessmentIdEvent(cmp, event);
    },	


})