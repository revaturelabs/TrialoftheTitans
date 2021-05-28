({
	doInit : function(component, event, helper) {
		const flipInterval = window.setInterval($A.getCallback(function(){
			const titanSlayer = document.querySelector('.titanSlayer');
			titanSlayer.classList.toggle('hide');
			const titanTimeout = window.setTimeout($A.getCallback(function(){
				titanSlayer.classList.toggle('switch');
				titanSlayer.classList.toggle('hide');
			}), 1000);
			component.set('v.setTimeoutId', titanTimeout);
		}), 10000);
		
		component.set('v.setIntervalId', flipInterval);
	},

	handleClear : function(component, event, helper) {
		 window.clearInterval(component.get("v.setIntervalId"));
		 window.clearTimeout(component.get('v.setTimeoutId'));
	}
})