({      
    doInit : function(component, event, helper) {
        helper.hSetTitans(component, event);
        helper.hSetName(component, event);
    },
    
    cNavigate : function(component, event, helper) {
        helper.hNavigate(component, event);
    },
    
    cSetTitanId : function(component,event){
        var titanId = event.getParam("titanId");
        component.set("v.activeTitan", titanId);
    },
    
      cSetExams : function(component, event, helper) {
        helper.hSetExams(component, event);
    }

})