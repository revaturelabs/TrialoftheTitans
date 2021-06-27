({
    // initialize creates columns for datatable
    init : function(component, event, helper) {
        component.set("v.columns", 
                    [
                        {label:'Hero', fieldName:'Name'},
                        // {label:'Squad Name', fieldName:'Squad__r.Name', type:'text'},
                        // {label:'', fieldName:""},
                        // {label:'Interview', type:'button', 
                        //     typeAttributes: {
                        //             name: 'start',
                        //             label: 'Start',
                        //             iconPosition: 'left',
                        //             iconName: 'utility:add',
                        //             variant: 'Success',
                                    // disabled: '{!v.heroList.Finalized__c}',  
                            // }
                        // }
                    ]
        )
        helper.getHeroes(component, event)
        helper.getInterviews(component, event)
    },

    // row selection handles button to start interview
    handleRowSelection : function(component, event, helper) {
        helper.handleRowSelection(component, event)
    },

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