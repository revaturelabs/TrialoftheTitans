({
    init : function(component, event) {
            component.set("v.columns", 
                [
                    {label:'Question', fieldName=""},
                    {label:'Answer', fieldName=""},
                    {label:'Score', fieldName=""},

                ]
            )
    
        var interviews = component.get("c.DoInit")
        interviews.setParams({cohort: event.getParam(NEEDCOHORTPARAMSET),
                                hero: event.getParam(NEEDHEROPARAMSET)})

                                // Reference: ^possibly just hero set
                                // var.setParams({param: component.find('table').getSelectedRows()[0],
                                // param2: component.find('aura:id').get("v.value")})

        interviews.setCallback(this, function(response){
            if(response.getState() === "SUCCESS"){
                component.set("v.interview", response.getReturnValue())
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        })
        $A.enqueueAction(interviews)
    },

    handleFinalize : function(component, event) {
        component
    },

})
