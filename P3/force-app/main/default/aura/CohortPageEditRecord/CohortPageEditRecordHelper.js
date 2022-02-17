/////////////////////
//
//  Name:CohortPageEditRecordHelper
//  Author: Brett Spokes
//  Description: Helper for cohort page to fire an
//  event with the purpose of informing the parent to
//  modify the view to the default state after a record 
//  edit submission or canceling of edit. 
//
/////////////////////

({
    handleClick : function(cmp, event) {          
        let cmpEvent  = cmp.getEvent("cmpReturnEvent");
        cmpEvent.fire();
    },
})