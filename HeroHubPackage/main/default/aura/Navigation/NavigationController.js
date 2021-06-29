/*

  Name: Navigation
  Author: Josh Miccolo
  Description: Navigation Bar for Hero Hub 

*/

({
    fireNav: function(component, event, helper) {

        const fireNav = component.getEvent("navigatePage");

        fireNav.setParam("page", event.currentTarget.innerHTML);

        fireNav.fire();
    },
    onNameClick: function(cmp, event, helper) {
        const evt = cmp.getEvent("navigateToResults")
        evt.fire()
        console.log('fired')
    }
})