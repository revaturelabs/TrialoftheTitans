/////////////////////////////////////////////////////
// 
//  Name: CohortPageContainer
//  Author: Kameron Fincher
//  Description: Main helper for the cohort page main 
//	view.  
//	
///////////////////////////////////////////////////
({
    // Init(): initializes titan
	Init : function(component, event) {
		let tabs = [];
        let titan = null;
        for(let i = 1;i<7;i++){
            switch(i){
                case 1:
                    titan = {name:"Hero List"};
                    break;    
                case 2:
                    titan = {name:"General Assessments"};
                    break;
                case 3:
                    titan = {name:"Hero Assessments"};
                    break;
                case 4:
                    titan = {name:"Exam List"};
                    break;
                case 5:
                    titan = {name:"Coding Assessments"};
                    break;
                case 6:
                    titan = {name:"QC Scores"};
                    break;     
                default:
                    titan = {name:"View "+i};
            }
            titan.state = "Blank"; //state:"Blank",index:i,buttonDisabled:false
            titan.index = i;
            titan.buttonDisabled = false;
            tabs.push(titan);
        }
        component.set( "v.currIndex", 0);
        component.set( "v.active", 'Hero List');                
        component.set( "v.tabs", tabs);
	},
    SetExamLink : function(component, event) {
        var action = component.get('c.returnDomain');
        var help = this;
        action.setCallback(this, (function (response) {
            if (response.getState() === "SUCCESS") {
                var data = response.getReturnValue();
                component.set("v.examURL", data);
                
            } 
        }));
        $A.enqueueAction(action);
          
    },
    ToExamHub : function(component, event) {
        var url = component.get('v.examURL');
        window.open(url, '_blank');
    },
    // HandleTabClick(): handles the event of a different tab being clicked
    HandleTabClick : function( component, event){
        let currentTitan = event.getParam("titan")
        this.HideNewAssessment(component, event);
        let titan = component.get('v.tabs');
        component.set("v.currIndex", titan.map(e => e.name).indexOf(currentTitan))
        component.set("v.active", currentTitan);
    },
    CreateNewAssessment : function(component, event){
       this.ToggleNewAssessment(component, event, 'Create New')
    },
    HideNewAssessment : function(component, event){
       this.ToggleNewAssessment(component, event, 'Blank')
    },
    ToggleNewAssessment : function(component, event, state){
        var titan = component.get('v.tabs');
       	var index = component.get('v.currIndex');

        titan[index].state=state;
        titan[index].buttonDisabled = (state == 'Create New');
        component.set('v.tabs',titan);
    },
    HandleReturnAssessmentIdEvent : function(cmp, event) {
        var eventReturnedId = event.getParam("AssessmentId");
        // set the handler attributes based on event data
        cmp.set("v.AssessmentId", eventReturnedId);
        this.ToggleNewAssessment(cmp, event, 'View Details');
    },
    HandleReturnComponentEvent : function(cmp, event) {
        this.ToggleNewAssessment(cmp, event, 'Blank');
		this.FetchData(cmp,event,'assessmentList');
    },
    HandleReturnHeroComponentEvent : function(cmp, event) {
        this.ToggleNewAssessment(cmp, event, 'Blank');
		this.FetchData(cmp,event,'assessmentHeroList');
    },
    FetchData : function(cmp, event, cmpName) {
        var assessmentList = cmp.find(cmpName);     
        assessmentList[0].FetchData();
    }
})