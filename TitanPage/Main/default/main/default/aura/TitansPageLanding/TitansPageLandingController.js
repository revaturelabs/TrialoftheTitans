({      
    doInit : function(component, event, helper) {
        helper.hSetTitans(component, event);
    },
    
    cShowTitan1 : function(component, event, helper) {
        helper.hShowTitan1(component, event);
        console.log("cShowTitan1 : hShowTitan1")
    },
    
    cShowTitan2 : function(component, event, helper) {
        helper.hShowTitan2(component, event);
    },
    
    cShowTitan3 : function(component, event, helper) {
        helper.hShowTitan3(component, event);
    },
    
    cShowTitan4 : function(component, event, helper) {
        helper.hShowTitan4(component, event);
    },
    
    cNavigate : function(component, event, helper) {
        helper.hNavigate(component, event);
    },
    
    
    
    cSetTitanId : function(component,event){
        var titanId = event.getParam("titanId");
        component.set("v.activeTitan", titanId);
    },
    
    
/*   	
 * this.hideCourseList(component);  
 * 
 * 
 * hideCourseList : function(component){
		console.log("attempting to hide course list")
		var displayDiv = component.find("course-list");
		$A.util.addClass(displayDiv,"toggle-hide");
	} */
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
})