({
	init : function(component, event) {
		let tabs = [];
        let titan = {name:"View 1"};
        tabs.push(titan);
        let titan2 = {name:"View 2"};
        tabs.push(titan2);
        component.set( "v.active", 'View 1');                
        component.set( "v.tabs", tabs);
	}
})