({
    edit : function(component, event, helper) {
        component.set('v.isEdit',true);
    },

    cancel : function(component, event, helper) {
        component.set('v.isEdit',false);
    }, 

    save : function(component, event, helper) {
        // TODO: Validation needs to be done (e.g. check for blanks, duplicates, negatives, etc.)

        let newSkills = [];
        let newEquivs = [];

        for (let i = 0; i < 5; i++) {
            let sk = component.find('skillInput_'+i).get('v.value');
            let eq = component.find('equivInput_'+i).get('v.value');

            newSkills.push(sk);
            newEquivs.push(eq);
        }

        component.set('v.skills',newSkills);
        component.set('v.equivs',newEquivs);

        component.set('v.isEdit',false);
    }
})
