({
    addRow : function(component) {
        component.getEvent("QCInterviewHeroReviewAddRowEvent").fire();

    },

        // delete row and registers the index of deleted row with the event attriute
    deleteRow : function(component) {
        component.getEvent("QCInterviewHeroReviewDeleteRowEvent").setParams({"index" : component.get("v.rowIndex") }).fire();
    },
           //Pass the info of the newly created Flag to the handler to be incorporated
    submit : function(component){
        component.getEvent("CreateFlag").setParams({"flagName": component.get("v.flagName"), "flagDescription": component.get("v.flagDescription"), "flagType": component.get("v.flagType")}).fire();
    }
})