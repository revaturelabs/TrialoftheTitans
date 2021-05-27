({
    doInit : function(component, event, helper) {
		// helper.HandleInit( component );
    var context = component.get("v.contextInfo")
    console.log("Hero Journey checking in...")
    console.log(context)
    },
    
    TitanClicked : function(component, event, helper){
        helper.HandleGameChange( component, event );
    }
})