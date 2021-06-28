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
	handleClick : function(component, event, helper){
		$A.util.toggleClass(event.currentTarget, 'shrunk-chart');
		$A.util.toggleClass(document.getElementById('mydthree'), 'shrunk-chart');
		const currentChart = component.get('v.currentChart');
		const chartEvent = component.getEvent('changeChart');
		if(currentChart === 'Titan Performance'){
            chartEvent.setParam('chartType', 'Titan Progress');
            chartEvent.fire();
        }
        else{
            chartEvent.setParam('chartType', 'Titan Performance');
            chartEvent.fire();
        }
	}
})
