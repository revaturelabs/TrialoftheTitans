({
    doInit : function(component, event, helper) {
		helper.HandleInit( component );
    },
    
    TitanClicked : function(component, event, helper){
        helper.HandleGameChange( component, event );
    }
})