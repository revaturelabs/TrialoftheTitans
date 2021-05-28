({
	GenerateCircleBar : function(component, event, helper) {
		if(component.get("v.scriptsLoaded" && "v.contextInfo")){
		helper.ProgressChart(component, event);	
		}
		
	},
	ScriptsLoaded : function(component, event, helper){
		component.set("v.scriptsLoaded","True")
		console.log("Scripts Loaded")
		console.log(component.get("v.scriptsLoaded"))
	},
})
