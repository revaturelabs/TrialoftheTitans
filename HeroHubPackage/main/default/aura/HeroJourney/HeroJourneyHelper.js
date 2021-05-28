({
    HandleInit : function( component ) {
<<<<<<< HEAD
		/*let method = component.get("c.getTitans");
        method.setCallback(this, function(response){
            if(response.getState() == "SUCCESS"){
                let tabs = [];
                tabs.push('Overview');
                
                let titans = response.getReturnValue();
=======
		let method = component.get("c.getTitans");
        method.setCallback(this, function(respone){
            if(method.getState() == "SUCCESS"){
                let tabs = [];
                tabs.push('Overview');
                
                let titans = method.getReturnValue();
>>>>>>> david
                for(let titan in titans){
                    tabs.push(titans[titan]);
                }
                                
                component.set( "v.active", 'Overview');                
                component.set( "v.tabs", tabs);
            } 
        });
<<<<<<< HEAD
        $A.enqueueAction(method);*/
=======
        $A.enqueueAction(method);
>>>>>>> david
    },
    
    HandleGameChange : function( component, event){
		component.set("v.active", event.getParam("titan"));
    }
})