({
    doInit: function( component, event, helper ) {
        /*getContextInfo = component.get("!c.getContextInfo");
        getcontextInfo.setCallback( this, function( response ) {
            if(response.getState() === "SUCCESS"){
                //set contextInfo
            }
            else {
                //User isn't signed in return to login
            }
        });*/
        component.set("v.contextInfo", {id:"00273731279", name:"Gladius Maximus", squad:{name:"YOU DON'T KNOW ME!!!", quote:"This is a quote"}, team:{name:"Amplifire", primary_color__c:"#EF6363"}});
        component.set("v.leadTeam", {name:"Amplife", primary_color__c:"#EF6363"});
        component.set("v.teamColors", "")
    }
})