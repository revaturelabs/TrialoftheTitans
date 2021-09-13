({
    createColumns : function(component){
        let actions = [
            {
                label: 'Detail', name: 'detail'
            }
        ];
        component.set('v.columns', [
            {
                label: 'OneOnOneId', fieldName: 'Id', type: 'text'
            },
            {
                label: 'Hero', fieldName:'HeroName', type: 'text'
            },
            {
                type: 'action', typeAttributes:{rowActions: actions}
            }
        ]);
    },
    getRecords : function(component) {
        this.createColumns(component);
        let trainerId = $A.get("$SObjectType.CurrentUser.Id");
        let week = component.get('v.week');
        let cohortId = component.get('v.CohortId');
        let getMethod = component.get('c.getOneOnOneId');
        getMethod.setParams({trainerId : trainerId, week : week, cohortId: cohortId});
        getMethod.setCallback(this, function (response) {
            let state = response.getState();
            if(state === 'SUCCESS'){
                let data = response.getReturnValue();
                for(let i of data){
                    i.HeroName = i.Hero__r.Name;
                }
                component.set('v.data',response.getReturnValue());
            }
        })
        $A.enqueueAction(getMethod); 
    },
    
    onRowAction : function(component){
        component.set('v.showData', true);
    },
    onRowSelection : function(component, event){
        let selectedRow = event.getParam('selectedRows');
        if(selectedRow.length > 0){ 
            component.set('v.OneOnOneId', selectedRow[0].Id);
        }
    },
    onChange : function(component){
        let week = component.find('week').get('v.value');
        component.set('v.week', week);
        component.set('v.showData', false);
        this.getRecords(component);
    },
})
