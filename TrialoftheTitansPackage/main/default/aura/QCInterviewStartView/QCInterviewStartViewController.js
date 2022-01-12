({
    TESTNEXT : function(component, event, helper) {
        helper.LaunchInterview(component);
        helper.LaunchStageEvent(component, "Interview");
    },


    StartInterview : function(component, event, helper) {
        helper.LaunchWeekEvent(component);
        helper.LaunchStageEvent(component, "Interview");
    },


    WeekSelect : function(component, event, handler) {
		helper.WeekSelect(component);
	}
})