({
    doInit: function( component, event, helper ) {
        const getContextInfo = component.get("c.getUserInfo");
        getContextInfo.setCallback( this, function( response ) {
            console.log(response.getState());
            if(response.getState() === "SUCCESS"){
                const contextinfo = response.getReturnValue();
                contextinfo.userExams = Object.entries(contextinfo.userExams);
                console.log(contextinfo);
                component.set("v.contextInfo", response.getReturnValue);
            }
            else {
                //User isn't signed in return to login
            }
        });
        $A.enqueueAction(getContextInfo);
        component.set("v.leadTeam", {name:"Amplife", primary_color__c:"#EF6363"});
    }
})