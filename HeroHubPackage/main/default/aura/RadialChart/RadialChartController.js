/*
//Name: RadialChart Component Controller
//Author: Andreology
//Created: 05/19/2021
//Updated: 05/30/2021
//Description: This Component will hold basic chart data validation and call the draw chart helper method. 
*/
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
    DrawRadialChart : function(component, event, helper) {
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
                        "highScore": .09,
                        "isPassed": false,
                        "name": "ello",
                        "nextExam": "asdfasdf",
                        "pastResult": []
                    }]
        };

        helper.DrawChart(component, event, titans);
    }
})
