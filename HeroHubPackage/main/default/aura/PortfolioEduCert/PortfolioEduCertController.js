({
    doInit : function(component) {

        let schoolInfo = component.get('c.getSchools');
        schoolInfo.setCallback(this, function(response){
            if(response.getState()==='SUCCESS') {
                //Sets the education in the database to attribute data
                component.set('v.data', response.getReturnValue())
            }
        });
        $A.enqueueAction(schoolInfo);
    },
    addEdu : function(component){
        component.set('v.addEdu', 'true')
    },
    doneEdu : function(component){
        component.set('v.addEdu', 'false')
    },
    editEdu : function(component){
        component.set('v.editEdu', 'true')
    },
    doneEditEdu : function(component){
        component.set('v.editEdu', 'false')
    }
})
