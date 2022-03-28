/*

  Name: Navigation
  Author: Josh Miccolo, Ethan Wilson
  Description: header and navigation
  Last Updated: 10/14/2021

*/

({
    /*fireNav() gets the MainPageNavigation event, sets its parameter to
    the current html page of the event before firing it off.*/
    fireNav: function (component, event, helper) {
        let fireNav = component.getEvent("MainPageNavigation");
        fireNav.setParams({ page: event.getParam("value").trim() });
        fireNav.fire();
    }
});
