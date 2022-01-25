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
    },
    addCert : function(component){
        component.set('v.addCert', 'true')
    },
    doneCert : function(component){
        component.set('v.addCert', 'false')
    },
    editCert : function(component){
        component.set('v.editCert', 'true')
    },
    doneEditCert : function(component){
        component.set('v.editCert', 'false')
    }
})