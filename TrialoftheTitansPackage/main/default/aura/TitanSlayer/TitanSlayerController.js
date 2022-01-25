/////////////////////
//
//  Name:TitanSlayerController
//  Author: Josh Miccolo
//  Description: Controller for the Titan Slayer
//  component. Initializes Animation setIntervals
//  and setTimeouts for animation. 
//
/////////////////////

({
	doInit : function(component, event, helper) {
		console.log('hit');
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
		console.log('from handleclear');
		 window.clearInterval(component.get("v.setIntervalId"));
		 component.set("v.setIntervalId", null);
		 window.clearTimeout(component.get('v.setTimeoutId'));
		 component.set("v.setTimeoutId", null);
	},
	logInterval : function(component){
		console.log(component.get("v.setIntervalId"));
	}
})