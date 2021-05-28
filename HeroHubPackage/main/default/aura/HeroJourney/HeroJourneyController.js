({
    doInit : function(component, event, helper) {
		helper.HandleInit( component );
    },
    
    TitanClicked : function(component, event, helper){
        helper.HandleGameChange( component, event );
    },
    d3IsReady : function(component, event, helper) {
      console.log("MADE IT TO D3ISREADY");
      component.set('v.isD3Available', true);
  }
})