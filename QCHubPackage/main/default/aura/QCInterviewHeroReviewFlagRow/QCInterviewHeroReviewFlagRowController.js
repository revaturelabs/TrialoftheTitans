({
    // adds row
    AddRow : function(component, event, helper){
        component.getEvent("QCInterviewHeroReviewAddRowEvent").fire();     
    },
    
    // delete row and registers the index of deleted row with the event attriute
    DeleteRow : function(component, event, helper){
       component.getEvent("QCInterviewHeroReviewDeleteRowEvent").setParams({"index" : component.get("v.rowIndex") }).fire();
    }, 
    //Pass the info of the newly created Flag to the handler to be incorporated
    submit : function(component, event, helper) {
        component.getEvent("CreateFlag").setParams({"flagName": component.get("v.flagName"), "flagDescription": component.get("v.flagDescription"), "flagType": component.get("v.flagType")}).fire();
    }
  
})