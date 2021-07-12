/*

  Name: Navigation
  Author: Josh Miccolo
  Description: Navigation Bar for Hero Hub 

*/

({
    fireNav: function(component, event, helper) {

        const fireNav = component.getEvent("navigatePage");
		//James Patton added .trim() to prevent the spaces from breaking compersons
        fireNav.setParam("page", event.currentTarget.innerHTML.trim());
        fireNav.fire();
    },
    onNameClick: function(cmp, event, helper) {
        const evt = cmp.getEvent("navigateToResults")
        evt.fire()
        console.log('fired')
    }
})