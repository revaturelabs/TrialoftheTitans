({
    // adds row
    AddRow : function(component, event, helper){
        component.getEvent("QCInterviewHeroReviewAddRowEvent").fire();     
    },
    
    // delete row and registers the index of deleted row with the event attriute
    DeleteRow : function(component, event, helper){
       component.getEvent("QCInterviewHeroReviewDeleteRowEvent").setParams({"index" : component.get("v.rowIndex") }).fire();
    }, 
  
})