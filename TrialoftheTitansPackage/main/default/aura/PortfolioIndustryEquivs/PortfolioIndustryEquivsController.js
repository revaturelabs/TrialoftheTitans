({
    doInit : function(component,event,helper){
        helper.getLists(component,event);
        helper.getMonthsList(component,event);
    },

    edit : function(component, event, helper) {
        component.set('v.isEdit',true);
    },

    cancel : function(component, event, helper) {
        component.set('v.isEdit',false);
    }, 

    save : function(component, event, helper) {
        helper.Skills(component,event);
    }
})