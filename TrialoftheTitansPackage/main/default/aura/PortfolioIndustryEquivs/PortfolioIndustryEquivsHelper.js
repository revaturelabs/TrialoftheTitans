({
    getLists : function(component,event){
        //Init helper class that checks to see if records are already saved to display specific user
        //SEE PortfolioIndustryEquivsController class for method
        let action = component.get("c.ReturnNames");
        action.setCallback(this,function(response){
            
            if(response.getState() === "SUCCESS"){
                let List = response.getReturnValue();
                component.set("v.skills",List);
            }
        })
        $A.enqueueAction(action);
    

    },
    getMonthsList : function(component,event){
        //Init helper class that checks to see if records are already saved to display specific user
        //SEE PortfolioIndustryEquivsController class for method
        let action = component.get("c.ReturnMonths");
        action.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
                let List = response.getReturnValue();
                component.set("v.equivs", List);
            }
        })
        $A.enqueueAction(action);
    },
    Skills : function(component, event){
        //Empty arrays that fill up with user input
        let newSkills = [];
        let newEquivs = [];

        for (let i = 0; i < 5; i++) {
            let sk = component.find('skillInput_'+i).get('v.value');
            let eq = component.find('equivInput_'+i).get('v.value');

            //If statment tests for negative Months inputed
            if(eq < 0){
                //Error shows, save is prevented from empty return
                var toastEventNegative = $A.get("e.force:showToast");
                toastEventNegative.setParams({
                                            "title": "Error!",
                                            "message": "You can not have negative number of months!",
                                            "type": "error"
                                        })
                toastEventNegative.fire();
                return;
            }
            //If statement tests for blanks
            if(sk === ""){
                //Error shows, save is prevented from empty return
                var ToastEventEmpty = $A.get("e.force:showToast");
                ToastEventEmpty.setParams({
                                        "title":"Error!",
                                        "message":"You can not have empty skills!",
                                        "type": "error"
                                    })
                ToastEventEmpty.fire();
                return;
            }

            newSkills.push(sk);
            newEquivs.push(eq);
        }
        //Double For loop tests for any duplicates 
        for (var i = 0; i <newSkills.length; i++){
            for(var j=0; j<newSkills.length; j++){
                if( i != j){
                    if(newSkills[i] == newSkills[j]){
                        //Error shows, save is prevented from empty return
                        var ToastEventDuplicate = $A.get("e.force:showToast");
                        ToastEventDuplicate.setParams({
                                                    "title":"Error!",
                                                    "message": "You can not have duplicate skills! Only pick one!",
                                                    "type":"error"
                                                    })
                        ToastEventDuplicate.fire();
                        return;
                    }
                }
            }
        }
        component.set('v.skills',newSkills);
        component.set('v.equivs',newEquivs);

        let SkillList = component.get("v.skills");
        let Months = component.get("v.equivs");
        //The following code runs the newly created list through an apex method to either update or save records
        //SEE PortfolioIndustryEquivsController class for method
        let method = component.get("c.InputPortSkills");
        method.setParams({
                        newSkills : component.get("v.skills"),
                        newEquivs : component.get("v.equivs")
                        });
        method.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
                //Just shows toast to indicate succesful save or update
                var ToastEventSuccess = $A.get("e.force:showToast");
                ToastEventSuccess.setParams({
                                            "title":"Success!",
                                            "message":"You have successfully recorded your industry equivalency!",
                                            "type" : "success"
                                            })
                ToastEventSuccess.fire();
                component.set('v.isEdit',false);
            }
        })
        $A.enqueueAction(method);
    } 
})