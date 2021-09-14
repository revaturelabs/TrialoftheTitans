({
    doInit : function(component,event, helper){
        helper.showProjects(component, event); 
    },
    
    // Save new project information and display on screen, when a user fills out the information    
    doSave : function(component, event, helper){
			var action = component.get("c.createProject");
            var projects = component.get("v.projects");
            action.setParams({"projObj" : component.get('v.projectObj'),
                              "updateParam" : false});
            action.setCallback(this, function(data){
                component.set('v.projectId', data.getReturnValue());
                projects.splice(0,0,component.get('v.projectObj'));
                component.set("v.projects", projects);
                
            });
            
         $A.enqueueAction(action);
            
    },
    		// Toggle the Edit button
            doEdit : function(component, event, helper){
			component.set('v.isEdit',false);
   
            
    },
    
    		// Allow user to Cancel and Edit
    		doCancel : function(component, event, helper){
			component.set('v.isEdit',true);
   
            
    },
    
            // Allow user to Save an Edit to an existing project. THIS IS NOT CURRENTLY SAVING 
            // EDITS TO THE DATABASE, ONLY TO THE VIEWING PAGE.
    		doReSave : function(component, event, helper){
			component.set('v.isEdit',true);      
               
            var action = component.get("c.createProject");
			var projects = component.get("v.projects");
            action.setParams({"projObj" : component.get('v.projectObj'),
                              "updateParam" : true});
            action.setCallback(this, function(data){
                component.set('v.projectId', data.getReturnValue());
                component.set("v.projects", projects);
                console.log('resave projects: ' + projects[0].Description__c);  
                
            });
    	$A.enqueueAction(action);
        
    },
})