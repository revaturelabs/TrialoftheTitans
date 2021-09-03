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
    validateRequired: function(component) {
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
    },

    Save : function(component, event) {
        // first call the helper function in if block which will return true or false.
        // this helper function checks that skill_c will not be blank on each row.
        if (this.validateRequired(component)) {
            // call the apex class method to save the equiv List
            // by passing the equiv List attribute to method param.  
            let action = component.get("c.saveEquivalency");
            action.setParams({
                "equivList": component.get("v.equivList")
            });
            // set call back 
            action.setCallback(this, function(response) {
                let state = response.getState();
                if (state === "SUCCESS") {
                    // if response is success then reset/blank the 'equivList' Attribute 
                    // and call the helper method to create a default Object Data to equiv List 
                    component.set("v.equivList", []);
                    this.createEquivalencyData(component, event);
                    let showToast = $A.get("e.force:showToast");
                    showToast.setParams({
                        "message" : "Successfully created record!",
                        "type" : "success"
                    });
                    showToast.fire();
                    component.set("v.currentPage", "homePage");
                }
            });
            // enqueue the server side action  
            $A.enqueueAction(action);
        }
    },

    Cancel : function(component) {
        component.set("v.currentPage", "homePage");
    },

    removeDeletedRow : function(component, event) {
        // get the selected row Index for delete from Lightning Event Attribute  
        let index = event.getParam("indexVar");
        // get the all List (equivList attribute) and remove the Object Element Using splice method    
        let allRowsList = component.get("v.equivList");
        allRowsList.splice(index, 1);
        // set the equivList after removing selected row element  
        component.set("v.equivList", allRowsList);
    }
})