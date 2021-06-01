({
    doInit: function( component, event, helper ) {
        const getContextInfo = component.get( "c.getUserInfo" );
        getContextInfo.setCallback( this, function( response ) {
            if( response.getState() === "SUCCESS" ){
                const contextinfo = response.getReturnValue();
                console.log("Getting User Context", contextinfo);
                component.set( "v.contextInfo", contextinfo );
            }
            else {
                //User isn't signed in return to login
            }
        });
        $A.enqueueAction( getContextInfo );
        
        const getTeamScores = component.get( "c.getTeamScores" );
        getTeamScores.setCallback( this, function( response ){
            console.log("TeamScores Response: " + response.getState());
            if( response.getState() === "SUCCESS"){
                let teamScores = response.getReturnValue();
                Object.keys(teamScores).forEach(category =>{
                    teamScores[category] = Object.entries(teamScores[category])
                });
                console.log(teamScores);
                component.set('v.leadTeams', teamScores);
           }
        });

        $A.enqueueAction( getTeamScores );
    },

    navigate : function(component, event, helper){

        console.log('hit');
        const page = event.getParam('page');
        console.log(page);
        component.set("v.navigate", page);

    }
})