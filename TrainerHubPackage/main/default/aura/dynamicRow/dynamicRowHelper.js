({
	createEquivalencyData: function(component, event) {
        // get the equivList from component and add New Object to List  
        let RowItemList = component.get("v.equivList");
        RowItemList.push({
            'Project__c': component.get("v.projectId"),
            'Skill__c': '',
            'Skill_Equivalency__c': ''
        });
        // set the updated list to attribute (equivList) again    
        component.set("v.equivList", RowItemList);
    },

    retrieveCurrentEquivalencies: function(component){
        let action = component.get("c.retrieveCurrentEquivalencies");
        action.setParams({projectId: component.get("v.projectId")});
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS'){
                component.set("v.currentEquivalencies", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    // helper function to check if skill__c is not null/blank on save  
    validateRequired: function(component, event) {
        let isValid = true;
        let uniqueSkills = new Set();
        let allEquivRows = component.get("v.equivList");
        let currentEquivs = component.get("v.currentEquivalencies");

        for(let indexVar = 0; indexVar < currentEquivs.length; indexVar++){
            uniqueSkills.add(currentEquivs[indexVar].Skill__c);
        }

        for (let indexVar = 0; indexVar < allEquivRows.length; indexVar++) {
            if (allEquivRows[indexVar].Skill__c == '') {
                isValid = false;
                alert('Skill can\'t be blank on row ' + (indexVar + 1));
            }
            else if (uniqueSkills.has(allEquivRows[indexVar].Skill__c)){
                isValid = false;
                alert('Can\'t add the same skill on row ' + (indexVar + 1));
            }
            else{
                uniqueSkills.add(allEquivRows[indexVar].Skill__c);
            }
        }
        return isValid;
    }
})