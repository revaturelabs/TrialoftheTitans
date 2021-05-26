({
	doInit : function(component, event, helper) {
        const heroContext = component.get("c.getUserInfo");
        heroContext.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                console.log(response.getState());
                const userinfo = response.getReturnValue();
                console.log(userinfo);
                userinfo.userExams = Object.entries(userinfo.userExams);
                console.log(userinfo.userExams);
                component.set("v.userinfo", userinfo);
            }
        });
        $A.enqueueAction(heroContext);
	}
})