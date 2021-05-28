({
    HandleInit : function( component ) {
        let data = component.get("v.contextInfo");
        console.log("data " );
        console.log(data);
		/*let method = component.get("c.getTitans");
        method.setCallback(this, function(response){
            if(response.getState() == "SUCCESS"){
                let tabs = [];
                tabs.push('Overview');
                
                let titans = response.getReturnValue();
                for(let titan in titans){
                    tabs.push(titans[titan]);
                }
                                
                component.set( "v.active", 'Overview');                
                component.set( "v.tabs", tabs);
            } 
        });
        $A.enqueueAction(method);*/
    },
    
    HandleGameChange : function( component, event){
		component.set("v.active", event.getParam("titan"));
    }
})