({
	createEquivalencyData: function(component, event) {
        // get the equivList from component and add New Object to List  
        let RowItemList = component.get("v.equivList");
        RowItemList.push({
            'Project__c': '',
            'Skill__c': '',
            'Skill_Equivalency__c': ''
        });
        // set the updated list to attribute (equivList) again    
        component.set("v.equivList", RowItemList);
    },
    // helper function to check if skill__c is not null/blank on save  
    validateRequired: function(component, event) {
        let isValid = true;
        let allEquivRows = component.get("v.equivList");
        console.log(allEquivRows);
        for (let indexVar = 0; indexVar < allEquivRows.length; indexVar++) {
           if (allEquivRows[indexVar].Skill__c == '') {
                isValid = false;
                alert('Skill Can\'t be Blank on Row Number ' + (indexVar + 1));
            }
        }
        return isValid;
    }
})