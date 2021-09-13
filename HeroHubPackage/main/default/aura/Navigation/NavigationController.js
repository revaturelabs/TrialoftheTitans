/*

  Name: Navigation
  Author: Josh Miccolo
  Description: Navigation Bar for Hero Hub 

*/

({
    /*fireNav() gets the MainPageNavigation event, sets its parameter to
    the current html page of the event before firing it off.*/
    fireNav: function(component, event, helper) {
        const fireNav = component.getEvent("navigatePage");
        fireNav.setParam("page", event.currentTarget.innerHTML);
        fireNav.fire();

    },

    /*onNameClick() gets the navResults event and then fires it off to navigate*/
    onNameClick: function(cmp, event, helper) {
        const evt = cmp.getEvent("navigateToResults");
        evt.fire();

    },
    onPortClick: function(cmp,event,helper){
        const evt = cmp.getEvent("navigateToPortfolio");
        evt.fire();
    }
})