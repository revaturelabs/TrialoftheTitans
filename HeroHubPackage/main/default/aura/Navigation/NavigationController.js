/*

  Name: Navigation
  Author: Josh Miccolo
  Description: Navigation Bar for Hero Hub 

*/

({
    fireNav : function(component, event, helper){

        console.log('fired');
        const fireNav = component.getEvent("navigatePage");

        fireNav.setParam("page", event.currentTarget.innerHTML);

        fireNav.fire();
    }
})