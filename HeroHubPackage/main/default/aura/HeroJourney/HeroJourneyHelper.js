/////////////////////////////////////////////////////
//
//  Name: HeroJourneyHelper.js
//  Author: David Serrano
//  Created: 5/13/2021
//  Updated: 5/25/2021
//  Description: Helper class to handle data initialization and events
// 
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

        for(let titan in titanMap){
            if( titanMap[titan][0] == currentTitan){
                let titanExams = titanMap[titan][1];
                //console.log("titan found: " + titanMap[titan][0]);
                //console.log(titanMap[titan]);

                for(let exam in titanExams){
                    console.log("exam "+exam+": "+JSON.stringify(titanExams[exam]));
                    if( titanExams[exam].highScore < 1){
                        titanExams[exam].highScore = titanExams[exam].highScore * 100;
                        titanExams[exam].highScore = titanExams[exam].highScore.toFixed(1);
                    }
               
                    listOfExams.push(titanExams[exam]);
                }

            };

        }

        component.set("v.active", currentTitan);
        component.set("v.currentTitanExams", listOfExams);

    },

    InitializeTabs : function(component){
        let contextInfo = component.get("v.contextInfo");
        let tabs = [];
        tabs.push("Overview");
        // console.log("journey context info: ");
        // console.log(contextInfo.userExams);
        // console.log(Object.keys(contextInfo.userExams))
       
        let titans = Object.keys(contextInfo.userExams);
        for(let titan in titans){
            tabs.push(titans[titan]);

        }

        component.set( "v.active", 'Overview');                
        component.set( "v.tabs", tabs);
    }
    
})