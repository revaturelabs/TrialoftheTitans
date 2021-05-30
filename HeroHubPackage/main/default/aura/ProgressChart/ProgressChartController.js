({
	GenerateCircleBar : function(component, event, helper) {
		// Only render chart if we have both d3.js and data loaded
		if(component.get( "v.scriptsLoaded" ) && component.get( "v.contextInfo" ) ){
		helper.ProgressChart( component, event );	
		}
		
	},
	ScriptsLoaded : function(component, event, helper){
		component.set( "v.scriptsLoaded" , true )
		console.log( "Scripts Loaded" )
		console.log( component.get( "v.scriptsLoaded" ) )
	},
})
