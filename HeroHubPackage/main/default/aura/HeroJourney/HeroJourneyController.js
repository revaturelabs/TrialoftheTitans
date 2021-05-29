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
	  	//helper.HandleInit( component );
    },

    // TitanClicked(): calls HandleGameChange method in helper class
    //  

    TitanClicked : function(component, event, helper){
        helper.HandleGameChange( component, event );
    },

    ContextChange : function(component, event, helper){
      helper.InitializeTabs( component );
  }
})