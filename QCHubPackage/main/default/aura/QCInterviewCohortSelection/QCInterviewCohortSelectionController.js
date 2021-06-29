({
    // initialize creates columns for datatable
    init : function(component, event, helper) {
        component.set("v.columns", 
                    [
                        {label:'Hero', fieldName="Account__c"},
                        {label:'Score', fieldName="QC_Score__c"},
                        {label:'Status', fieldName=""}, //should be Finalized__c and should show 1 icon on true, and another on false
                        {label:'Interview', type:'button', 
                            typeAttributes: {
                                    name: 'start',
                                    label: 'Start',
                                    iconPosition: 'left',
                                    iconName: 'utility:warning',
                                    variant: 'warning' 
                            }
                        }
                    ]
        )
        helper.getHeroes(component, event)
    },

    // row selection handles button to start interview
    handleRowSelection : function(component, event, helper) {
        helper.handleRowSelection(component, event)
    },

})

// add this to v.columns attribute when Finalized__c on QC_Interview__c = true
// {type : 'button', label: 'Interview',
// typeAttributes: {
//         name: 'completed',
//         label: 'Complete',
//         iconPosition: 'right',
//         iconName: 'utility:success',
//         variant: 'Success' 
// }
// }