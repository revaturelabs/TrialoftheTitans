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
    show : function(component, event, helper) {
        var infos = component.find("divId"),
            // Get the index value
            index = event.target.closest("[data-index]").dataset.index;
        // Normalize to array
        infos = infos.length? infos: [infos];
        $A.util.addClass(infos[index], 'divShow');
        
        
    }
    */
    
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