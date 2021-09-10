({
    /*edit() and cancel() flip the isEdit attribute on or off depending on whether edit() is called
    - for true - or cancel() is called - for false. */
    edit : function(component, event, helper) {
        component.set('v.isEdit',true);

    },

    cancel : function(component, event, helper) {
        component.set('v.isEdit',false);

    },

    /* save() gathers up information about the experience being created and saves the experience
    to the database. */

    save : function(component, event, helper) {
        // TODO: add controller logic to database
        // TODO: Validation needs to be done (e.g. check for blanks, duplicates, negatives, etc.)

        let c = component.find('c0').get('v.value');
        let p = component.find('p0').get('v.value');
        let ds = component.find('ds0').get('v.value');
        let de = component.find('de0').get('v.value');

        let co = component.get('v.company');
        let po = component.get('v.position');
        let dsv = component.get('v.dateStart');
        let dev = component.get('v.dateEnd');

        co[0] = c;
        po[0] = p;
        dsv[0] = ds;
        dev[0] = de;

        component.set('v.company', co);
        component.set('v.position', po);
        component.set('v.dateStart', dsv);
        component.set('v.dateEnd', dev);


        component.set('v.isEdit',false);

    }
})
