({
    doSearch : function(component, event, helper) {
        helper.getRecords(component);
    },
    onRowAction : function(component, event, helper){
        helper.onRowAction(component);
    },
    onRowSelection : function(component, event, helper){
        helper.onRowSelection(component, event);
    },
    onChange : function(component, event, helper){
        helper.onChange(component);
    }
})