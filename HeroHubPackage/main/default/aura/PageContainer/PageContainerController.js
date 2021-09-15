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
                component.set("v.contextInfo", contextinfo);
            } else {
                //User isn't signed in return to login
            }
        });
        $A.enqueueAction(getContextInfo);

        const getTeamScores = component.get("c.getTeamScores");
        getTeamScores.setCallback(this, function(response) {
            
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
        const page = event.getParam('page');
        component.set("v.navigate", page);
    },

    navigateToResults: function(cmp, event, helper) {
        cmp.set('v.PortClicked', false);
        cmp.set('v.OneClicked', false);
        
        if (cmp.get('v.nameClicked') == true) {
            cmp.set('v.nameClicked', false);
        } else {
            cmp.set('v.nameClicked', true);
        }
        
    },
    navigateToPort: function(cmp, event, helper){
        cmp.set('v.nameClicked', false);
        cmp.set('v.OneClicked', false);

        if (cmp.get('v.PortClicked') == true){
            cmp.set('v.PortClicked', false);
        } else {
            cmp.set('v.PortClicked', true);
        }
    },
    navigateToOneOnOne: function(cmp,event,helper){
        cmp.set('v.nameClicked', false);
        cmp.set('v.PortClicked', false);

        if(cmp.get('v.OneClicked')==true){
            cmp.set('v.OneClicked',false);
        }else{
            cmp.set('v.OneClicked', true);
        }
    }
})