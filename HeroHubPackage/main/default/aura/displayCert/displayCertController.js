({
    doInit : function(component) {

        let getCertifications = component.get('c.Certifications');
        getCertifications.setCallback(this, function(response){
            if(response.getState()==='SUCCESS') {
                //Sets the education in the database to attribute data
                component.set('v.data', response.getReturnValue())
            }
        });
        $A.enqueueAction(getCertifications);
    }
})
