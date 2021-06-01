({
    GenerateRadialChart: function(component, event, helper) {
		// Only render chart if we have both d3.js and data loaded
		if(component.get( "v.scriptsLoaded" ) && component.get( "v.contextInfo" ) ){
        const titans = component.get( "v.contextInfo" ).userExams;
		helper.drawChart( component, event, titans );	
		}
		
	},
    ScriptsLoaded : function(component, event, helper){
        console.log("radial Chart Scripts Load");
		component.set( "v.scriptsLoaded" , true )
		console.log( "Scripts Loaded" )
		console.log( component.get( "v.scriptsLoaded" ) )
	},
    drawRadialChart : function(component, event, helper) {
        let data = component.get('v.contextInfo');
       
        let titans = {
            "Apex": [
                {
                    "currentResults": [],
                    "highScore": .49,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                },
                {
                    "currentResults": [],
                    "highScore": .89,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                }],
            "Data Modeling": [
                {
                    "currentResults": [],
                    "highScore": .29,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                },
                {
                    "currentResults": [],
                    "highScore": .19,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                }],
            "Process Automation": [
                {
                    "currentResults": [],
                    "highScore": .69,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                },
                {
                    "currentResults": [],
                    "highScore": .29,
                    "isPassed": false,
                    "name": "ello",
                    "nextExam": "asdfasdf",
                    "pastResult": []
                }],
                "Security": [
                    {
                        "currentResults": [],
                        "highScore": .19,
                        "isPassed": false,
                        "name": "ello",
                        "nextExam": "asdfasdf",
                        "pastResult": []
                    },
                    {
                        "currentResults": [],
                        "highScore": .69,
                        "isPassed": false,
                        "name": "ello",
                        "nextExam": "asdfasdf",
                        "pastResult": []
                    }]
        };

        helper.drawChart(component, event, titans);
    },

    handleClick : function ( component, event, helper){
        $A.util.toggleClass(event.currentTarget, 'shrunk-chart');
		$A.util.toggleClass(document.getElementById('progress-chart'), 'shrunk-chart');
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
