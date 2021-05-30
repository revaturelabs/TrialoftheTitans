/////////////////////////////////////////////////////
//
//  Name: HeroJourneyHelperController.js
//  Author: David Serrano
//  Created: 5/13/2021
//  Updated: 5/25/2021
//  Description: Javascript controller to call methods in helper class
//
///////////////////////////////////////////////////

({
    doInit : function(component, event, helper) {
		// helper.HandleInit( component );
    var context = component.get("v.contextInfo")
    console.log("Hero Journey checking in...")
    console.log(context)
    },
    
    TitanClicked : function(component, event, helper){
        helper.HandleGameChange( component, event );
    },

    // ContextChange(): gets called when UserContextInfo data gets passed in
    
    ContextChange : function(component, event, helper){
      helper.InitializeTabs(component);
  }
})