({
	doInit : function(component, event, helper) {
		const flipInterval = setInterval(function(){
			const titanSlayer = document.querySelector('.titanSlayer');
			titanSlayer.classList.toggle('hide');
			setTimeout(function(){
				titanSlayer.classList.toggle('switch');
				titanSlayer.classList.toggle('hide');
			}, 1000)
		}, 10000);
	}
})