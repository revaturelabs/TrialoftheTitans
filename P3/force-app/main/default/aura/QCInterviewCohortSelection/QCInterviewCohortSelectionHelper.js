({
    getHeroes : function(component) {
        let action = component.get("c.getHeroes");
        action.setParams({cohort: component.get("v.currentCohort")})

        action.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.heroList", response.getReturnValue())
            } else if (response.getState() === "ERROR") {
                let errors = response.getError();
                let showToast = $A.get("e.force:showToast");
                if (errors) {
                    showToast.setParams({
                        "title": "ERROR",
                        "message": errors[0].message+"heroes"
                    })
                    showToast.fire();
                }
                else {
                    showToast.setParams({
                        "title": "ERROR",
                        "message": "Unknown error"
                    })
                    showToast.fire();
                }
            }
        })
        $A.enqueueAction(action)

    },  

    getInterviews : function(component) {
        let int = component.get("c.getInterviews")

        let heroData = JSON.parse(JSON.stringify(component.get("v.heroList")));
        let heroDataList = [];

        for(let p in heroData){
            heroDataList.push(heroData[p]);
        }

        int.setParams({heroes: heroDataList})

        int.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.interviewList", response.getReturnValue())
            } else if (response.getState() === "ERROR") {
                let errors = response.getError();
                let showToast = $A.get("e.force:showToast");
                if (errors) {
                    showToast.setParams({
                        "title": "ERROR",
                        "message": errors[0].message
                    })
                    showToast.fire();
                }
                else {
                    showToast.setParams({
                        "title": "ERROR",
                        "message": "Unknown error"
                    })
                    showToast.fire();
                }
            }
        })
        $A.enqueueAction(int);

    }, 

    handleRowSelection : function(component, event) {
        component.set("v.currentHero", event.getParam('selectedRows')[0]);
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