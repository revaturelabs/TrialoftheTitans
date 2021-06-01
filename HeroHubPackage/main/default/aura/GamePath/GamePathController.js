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