({
    // initialize creates columns for datatable
    init : function(component, event, helper) {
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
                    ]
        )
        helper.getHeroes(component, event)
        helper.getInterviews(component, event)
    },
    
    handleCohort : function(component, event, helper) {
        let cohort = event.getParam("SelectedCohort");
        component.set("v.currentCohort", cohort);
    },

    // row selection handles button to start interview
    handleRowSelection : function(component, event, helper) {
        helper.handleRowSelection(component, event)
    },

    LaunchInterview : function(component, event, helper){
        let row = event.getParam("row");
        console.log("LAUNCH INTERVIEW FUNCTION");
        helper.LaunchInterviewEvent(component, row);
        //helper.LaunchStageEvent(component, "Interview");
    }

})

// add this to v.columns attribute when heroList.Finalized__c=true, if I can figure out how to do this
// {type : 'button', label: 'Interview',
// typeAttributes: {
//         name: 'completed',
//         label: 'Complete',
//         iconPosition: 'right',
//         iconName: 'utility:success',
//         variant: 'Success' 
// }
// }