/////////////////////////////////////////////////////
//
//  Name: GamePathController.cmp
//  Author: David Serrano
//  Created: 5/13/2021
//  Updated: 5/28/2021
//  Description: Javascript controller that helps with handling clicks. GameInit never gets used.
//
///////////////////////////////////////////////////

({
	
	GameInit : function( component, event, helper ) {
		helper.handleInit( component, event );
	},

	TitanClicked : function( component, event, helper ){
		helper.HandleGameChange( component, event );
	},
	
	ExamClicked : function ( component, event, helper ){
		helper.HandleExamClick( component, event );
	}

})