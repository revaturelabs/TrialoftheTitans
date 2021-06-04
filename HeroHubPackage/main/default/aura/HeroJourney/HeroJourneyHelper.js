/////////////////////////////////////////////////////
//
//  Name: HeroJourneyHelper.js
//  Author: David Serrano
//  Description: Helper class to handle data initialization and event
//
///////////////////////////////////////////////////

({  
    // HandleGameChange(): handles the event of a different Titan tab being clicked
    // component: passes in the component where the event gets sent
    // event: passes in the event occurring

    HandleGameChange : function( component, event){
        let currentTitan = event.getParam("titan")
        let titanMap = Object.entries(component.get("v.contextInfo").userExams);
        let listOfExams = [];

        // going throgh each titan map and checking if the titan is the same as the currentTitan to display
        // if it is, go ahead and get all the ExamList objects and push then into listOfExams
        for(let titan in titanMap){
            if( titanMap[titan][0] == currentTitan){
                let titanExams = titanMap[titan];
                //console.log("DAVID TITAN MAP", titanMap[titan]);
                //console.log(titanMap[titan]);
                //console.log("titan found: " + titanMap[titan][0]);
                //console.log(titanMap[titan]);
                for(let exam of titanExams[1]){
                    //console.log("exam "+exam+": "+JSON.stringify(titanExams[exam]));
                    //console.log('DAVID EXAM LIST', exam);
                    listOfExams.push(exam);

                }

            };

        }
		
        console.log(listOfExams);
        component.set("v.active", currentTitan);
        component.set("v.currentTitanExams", listOfExams);

    },

    // InitalizaTabs(): sets a default 'Overview' and creates tabs for all the assigned titan's a user has

    InitializeTabs : function(component){
        let contextInfo = component.get("v.contextInfo");
        let tabs = [];
        tabs.push("Overview");
        // console.log("journey context info: ");
        console.log("UserEXAMS", contextInfo.userExams);
        // console.log(Object.keys(contextInfo.userExams))
       
        // using Object.Keys because contextInfo.userExams is a map where each key is a titan
        // Object.keys returns a list os strings containing each key
        let titans = Object.keys(contextInfo.userExams);
        for(let titan in titans){
            tabs.push(titans[titan]);

        }

        component.set( "v.active", 'Overview');                
        component.set( "v.tabs", tabs);
    }
    
})