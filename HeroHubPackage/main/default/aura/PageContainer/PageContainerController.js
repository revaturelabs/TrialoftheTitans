/////////////////////
//
//  Name:PageContainerController
//  Author: Josh Miccolo
//  Description: Controller for Hero Hub Page
//  returns user context info and navigates to pages
//
/////////////////////
({
    doInit: function(component, event, helper) {
        const getContextInfo = component.get("c.getUserInfo");
        getContextInfo.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                const contextinfo = response.getReturnValue();
                console.log("Getting User Context", contextinfo);
                component.set("v.contextInfo", contextinfo);
            } else {
                //User isn't signed in return to login
            }
        });
        $A.enqueueAction(getContextInfo);

        const getTeamScores = component.get("c.getTeamScores");
        getTeamScores.setCallback(this, function(response) {
            console.log("TeamScores Response: " + response.getState());
            console.log(response.getReturnValue());
            if (response.getState() === "SUCCESS") {
                let teamScores = response.getReturnValue();
                Object.keys(teamScores).forEach(category => {
                    teamScores[category] = Object.entries(teamScores[category])
                });
                // teamScores.Team[0][0] = "Synergy";
                console.log('TeamScores:' + teamScores);
                component.set('v.leadTeams', teamScores);
            }
        });

        $A.enqueueAction(getTeamScores);
    },

    navigate: function(component, event, helper) {
		let titanString = "Titans";
        console.log('hit');
        const page = event.getParam('page');
        console.log(page);
        component.set("v.navigate", page);
    },

    navigateToResults: function(cmp, event, helper) {

        if (cmp.get('v.nameClicked') == true) {
            cmp.set('v.nameClicked', false);
        } else {
            cmp.set('v.nameClicked', true);
        }
        console.log(cmp.get('v.nameClicked'))
    }
})