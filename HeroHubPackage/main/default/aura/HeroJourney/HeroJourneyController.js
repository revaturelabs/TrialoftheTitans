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
    // TitanClicked(): calls HandleGameChange method in helper class

    TitanClicked : function(component, event, helper){
        helper.HandleGameChange( component, event );
    },

    // ContextChange(): gets called when UserContextInfo data gets passed in
    
    ContextChange : function(component, helper){
      helper.InitializeTabs( component );
  }
})