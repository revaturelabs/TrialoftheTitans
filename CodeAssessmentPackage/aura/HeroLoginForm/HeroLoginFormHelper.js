({
    handleScheduling : function(cmp, event, helper){
        
        let schedule = cmp.get("c.runScheduler");
        schedule.setParams({
            "username" : cmp.get("v.username"),
            "password" : cmp.get("v.password"),
            "cron" : cmp.get("v.cronExpression"),
            "jobName" : cmp.get("v.jobName")
        });
        
        schedule.setCallback(this, function(res){
            let state = res.getState();
            if(state == "SUCCESS"){
                cmp.set("v.message", res.getReturnValue());
            }
        });
        
        $A.enqueueAction(schedule);
        
    }
})