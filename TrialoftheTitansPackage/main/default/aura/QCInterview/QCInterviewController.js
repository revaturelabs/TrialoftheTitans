({
	OnInit : function(component, event, helper){
		helper.LoadSessionData(component);
	},


	UpdateStage : function(component, event, helper){
		helper.UpdateStage(component, event);
	},


	QAEvent : function(component, event, helper){
		helper.AddQuestionAnswer(component, event);
	},


	SetHero : function(component, event, helper){
		helper.SetHero(component, event);
	},


	SetWeek : function(component, event, helper){
		helper.SetWeek(component, event);
	}
})