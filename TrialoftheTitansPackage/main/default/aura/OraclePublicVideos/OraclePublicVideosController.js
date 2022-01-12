/////////////////////////////////////////////////////
//
//  Name: Oracle Public Videos JS Controller
//  Author: Alyssa Reed
//  Description: HandleSelectFilter first makes 
//  	sure only one option is checked and then 
//  	displays the correct filtered list of videos
//  	depending on the value of the filter option 
//  	selected. DoInit renders the default filter
//  	option as soon as the component loads.
//
/////////////////////////////////////////////////////

({
   HandleSelectFilter : function(component, event, helper) {
        // This will contain the index (position) of the selected lightning filter option
        let selectedMenuItemValue = event.getParam("value");
        // Find all menu items
        //console.log(selectedMenuItemValue);
        let menuItems = component.find("menuItems");
        menuItems.forEach(function(menuItem) {
            // For each menu item, if it was checked, un-check it. This ensures that only one
            // menu item is checked at a time
            if (menuItem.get("v.checked")) {
                menuItem.set("v.checked", false);
            }
            // Check the selected menu item
            if (menuItem.get("v.value") === selectedMenuItemValue) {
                menuItem.set("v.checked", true);
            }
        });
       
       let hero = component.get("c.filterByHeroName");
        hero.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                if(selectedMenuItemValue == "FilterByHeroName"){
                component.set("v.heroFilterDecision", true);
                component.set("v.recentFilterDecision", false);
                component.set("v.cohortFilterDecision", false);
                component.set("v.heroVideoResults", response.getReturnValue());
               
                }
            }
        });
        $A.enqueueAction(hero);
       
       let cohort = component.get("c.filterByCohort");
        cohort.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                if(selectedMenuItemValue == "FilterByCohort"){
                component.set("v.heroFilterDecision", false);
                component.set("v.recentFilterDecision", false);
                component.set("v.cohortFilterDecision", true);
                component.set("v.cohortVideoResults", response.getReturnValue());
                }
            }
        });
        $A.enqueueAction(cohort);
       
       let recent = component.get("c.getPublicVideos");
        recent.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                if(selectedMenuItemValue == "FilterByRecent"){
                component.set("v.heroFilterDecision", false);
                component.set("v.recentFilterDecision", true);
                component.set("v.cohortFilterDecision", false);
                component.set("v.recentVideoResults", response.getReturnValue());
                }
            }
        });
        $A.enqueueAction(recent);
    },
    
    DoInit : function(component, event, helper){
        let recent = component.get("c.getPublicVideos");
        recent.setCallback(this, function(response){
           if(response.getState() === "SUCCESS"){
                component.set("v.heroFilterDecision", false);
                component.set("v.recentFilterDecision", true);
                component.set("v.cohortFilterDecision", false);
                component.set("v.recentVideoResults", response.getReturnValue());
                }
        });
        $A.enqueueAction(recent);
        
        
        let filterLimit = component.get("c.userProfile");
        filterLimit.setCallback(this, function(response){
              if(response.getState() === "SUCCESS"){
            		if(response.getReturnValue() == "Hero"){
            		component.set("v.disabledCohortFilter", true);
        			}	
       			 }
    		});
        $A.enqueueAction(filterLimit);
    }

})