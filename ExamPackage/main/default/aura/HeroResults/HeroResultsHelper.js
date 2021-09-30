({
	getHeroResultsList : function(component) {
        var action = component.get("c.getHeroResults");
        // var self = this;
        action.setParams({
            'examResultId': component.get('v.examResultId')
        })
        action.setCallback(this,function(actionResult){
            component.set('v.hResults',actionResult.getReturnValue());
        });
		$A.enqueueAction(action);
	}
})