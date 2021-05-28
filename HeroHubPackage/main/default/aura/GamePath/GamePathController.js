({
	GameInit : function( component, event, helper ) {
		helper.handleInit( component, event );
	},

	TitanClicked : function( component, event, helper ){
		helper.handleGameChange( component, event );
	},
	
	ExamClicked: function ( component, event, helper ){
		helper.handleExamClick( component, event );
	}

})