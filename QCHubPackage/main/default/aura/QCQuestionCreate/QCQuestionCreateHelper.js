({
    helperCreateNewQuestion : function(component) {
        component.set("v.questionCreated", false);
        component.find("recordForm").set("v.recordId", null);
        component.find("recordForm").set("v.mode", "edit");

    },
    helperHandleSuccess : function(component) {
        component.set("v.questionCreated", true);
    }
})
