({
    // used to initialize the hero list of currently selected cohort
    getHeroes : function(component) {
        let heroes = component.get("c.getHeroes")
        //this needs updated once I find out how to access selected cohort
        // heroes.setParams({cohort: component.find('COHORT').getSelectedRows[0]}) 
        heroes.setParams({cohort: component.get("v.currentCohort")})

        heroes.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.heroList", response.getReturnValue())
            } else if (response.getState() === "ERROR") {
                let errors = response.getError();
                console.error(errors);
            }
        })
        $A.enqueueAction(heroes)

    },  

    // used to initialize a list of finalized interviews pertaining to this interview session iteration (pull from event attribute)
    getInterviews : function(component) {
        //use next line when event is put into hub and utilized
        // component.set("v.interviewList", event.getParam("finalizedInterviews"))
        let int = component.get("c.getInterviews")
        //this needs updated once I find out how to access selected cohort
        // heroes.setParams({cohort: component.find('COHORT').getSelectedRows[0]}) 
        int.setParams({heroes: component.get("v.heroList")})

        int.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.interviewList", response.getReturnValue())
            } else if (response.getState() === "ERROR") {
                let errors = response.getError();
                console.error(errors);
            }
        })
        $A.enqueueAction(int);

    }, 

    // should handle selection of hero and start of interview, 
    // which is to select and load the next component and pass in the hero selection
    handleRowSelection : function(component, event) {
        // modify and utilize when event is put into hub and utilized
        // component.getEvent("QCInterviewFinalized").setParams({"index" : component.get("v.index") }).fire()

        //right now, this function sets the current hero to reference
        component.set("v.currentHero", event.getParam('selectedRows')[0]);
        // gets param for selected hero if needed for apex
        // hero.setParams(component.find('teacherTable').getSelectedRows()[0])
    },  

    LaunchInterviewEvent : function(component, event){
        let hero = event.getParam("row");
        let liEvent = component.getEvent("InterviewHeroEvent");
        liEvent.setParams({"SelectedHero" : hero});
        liEvent.fire();
    },

    LaunchStageEvent : function(component, stage){
        let StageEvent = component.getEvent("UpdateStageEvent");
        StageEvent.setParams({"StageName" : stage});
        StageEvent.fire();
    },
    
    SetColumns : function(component){
        component.set("v.columns", 
        [
            {label:'Hero', fieldName:'Name'},
            {label:'Squad Name', fieldName:'Squad__r.Name', type:'text'},
            {label:'', fieldName:""},
            {type:'button', 
                 typeAttributes: {
                        name: 'start',
                        label: 'Interview',
                        iconPosition: 'left',
                        iconName: 'utility:add',
                        variant: 'Success',
                        disabled: false,  
                 }
             }
        ]);
    },

    SetCohort : function(component, event){
        let cohort = event.getParam("SelectedCohort");
        component.set("v.currentCohort", cohort);
    },
})
