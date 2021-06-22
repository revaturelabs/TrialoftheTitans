({
    // initialize (duh): creates columns for datatable
    init : function(component, event) {
        component.set("v.columns", 
                    [
                        {label:'Hero', fieldName=""},
                        {label:'Score', fieldName=""},
                        {label:'Status', fieldName=""},
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
    },

    // row selection handles button to start interview
    handleRowSelection : function(component, event, helper) {
        helper.handleRowSelection(component, event)
    },

})

// {type : 'button', label: 'Interview',
// typeAttributes: {
//         name: 'completed',
//         label: 'Complete',
//         iconPosition: 'right',
//         iconName: 'utility:success',
//         variant: 'Success' 
// }
// }