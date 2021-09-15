({
    helperCreateNewQuestion : function(component) {
        // Set the questionCreated attribute to false when clicking the Create New Question button
        component.set("v.questionCreated", false);
        // Set the recordId to null so a new question can be entered 
        component.find("recordForm").set("v.recordId", null);
        // Set the mode to edit so that the form looks like how it was when it first is rendered
        component.find("recordForm").set("v.mode", "edit");

    },
    helperHandleSuccess : function(component) {
        // Set the questionCreated attribute to true when clicking the save button
        component.set("v.questionCreated", true);
    }
})
