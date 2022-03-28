/////////////////////
//
//  Name:PageContainerController
//  Author: Josh Miccolo, Ethan Wilson
//  Description: Controller for Page Container
//  returns user context info and navigates to pages
//  Last Updated: 10/14/2021
/////////////////////
({
    doInit: function (component, event, helper) {
        const getContextInfo = component.get("c.getUserInfo");
        getContextInfo.setCallback(this, function (response) {
            if (response.getState() === "SUCCESS") {
                const contextinfo = response.getReturnValue();
                component.set("v.contextInfo", contextinfo);
            } else {
                //User isn't signed in return to login
            }
        });
        $A.enqueueAction(getContextInfo);

        const getUserName = component.get("c.getUserName");
        getUserName.setCallback(this, function (response) {
            if (response.getState() === "SUCCESS") {
                const userName = response.getReturnValue();
                component.set("v.userName", userName);
            }
        });
        $A.enqueueAction(getUserName);

        const getTeamScores = component.get("c.getTeamScores");
        getTeamScores.setCallback(this, function (response) {
            if (response.getState() === "SUCCESS") {
                let teamScores = response.getReturnValue();
                Object.keys(teamScores).forEach((category) => {
                    teamScores[category] = Object.entries(teamScores[category]);
                });
                // teamScores.Team[0][0] = "Synergy";
                console.log("TeamScores:" + teamScores);
                component.set("v.leadTeams", teamScores);
            }
        });

        $A.enqueueAction(getTeamScores);
    },

    navigate: function (component, event, helper) {
        const page = event.getParam("page");
        component.set("v.navigate", page);
        console.log(component.get("v.navigate") === component.get("v.userName"));
    }
});
