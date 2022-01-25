({
    helperInit : function(cmp) {
        //Populate aura attributes
        let action = cmp.get("c.GetUserList");
        action.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
                let List = response.getReturnValue();
                cmp.set("v.Hero", List);
            }
        })
        $A.enqueueAction(action);


    },
    ShowAllEquivRecords: function(cmp){
        cmp.set('v.Ecolumns', [
                                {label: 'Name', fieldName: 'Name', type: 'text'},
                                {label: 'Equivalency Skill', fieldName: 'Skill_Equivalency__c', type: 'text'}
                                
        ]);
        let actionEq = cmp.get("c.EquivGet");
        
        actionEq.setParams({Hero : cmp.get("v.HeroId") });
        actionEq.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
                cmp.set("v.EquivList", response.getReturnValue());
                
            }

        })
        $A.enqueueAction(actionEq);
    },
    ShowAllProjectRecords: function(cmp){

        cmp.set('v.Pcolumns', [
                            {label: 'Project Name', fieldName: 'Name', type: 'text'},
                            {label: 'Description', fieldName: 'Description__c', type:'text'},
                            {label: 'Roles and Responsibilities', fieldName: 'Roles_Responsibilities__c', type:'text'},
                            {label: 'Technologies', fieldName: 'Technologies__c', type: 'text'}
        ]);
        let actionP = cmp.get("c.ProjectGet");
        actionP.setParams({Hero : cmp.get("v.HeroId") });
        actionP.setCallback(this,function(response){
            if(response.getState() === "SUCCESS"){
                cmp.set("v.ProjectList", response.getReturnValue());
                
            }

        })
        $A.enqueueAction(actionP);
    },
    ShowAllEducationRecords: function(cmp){
        cmp.set('v.EDcolumns', [
            {label: 'School', fieldName: 'Name', type: 'text'},
            {label: 'Major', fieldName: 'Major__c', type:'text'},
            {label: 'Degree', fieldName: 'Degree__c', type:'text'},
            {label: 'Date Graduated', fieldName: 'DateGraduate__c', type: 'Date'}
            ]);
            let actionED = cmp.get("c.EducationGet");
            actionED.setParams({Hero : cmp.get("v.HeroId") });
            actionED.setCallback(this,function(response){
                if(response.getState() === "SUCCESS"){
                    cmp.set("v.EducationList", response.getReturnValue());
                    
                }
    
            })
            $A.enqueueAction(actionED);
    },
    ShowAllCertificationRecords: function(cmp){
        cmp.set('v.Ccolumns', [
            {label: 'Name', fieldName: 'Name', type: 'text'},
            {label: 'Assessor', fieldName: 'Assessor__c', type:'text'},
            {label: 'Verification Site', fieldName: 'Verification_Site__c', type:'text'},
            {label: 'Date Issued', fieldName: 'Date_Issued__c', type: 'Date'}
            ]);
            let actionC = cmp.get("c.CertGet");
            actionC.setParams({Hero : cmp.get("v.HeroId") });
            actionC.setCallback(this,function(response){
                if(response.getState() === "SUCCESS"){
                    cmp.set("v.CertificationList", response.getReturnValue());
                    
                }
    
            })
            $A.enqueueAction(actionC);
    },
    ShowAllExpRecords: function(cmp){
        cmp.set('v.ExpColumns', [
            {label: 'Position', fieldName: 'Position__c', type:'text'},
            {label: 'Company', fieldName: 'Company__c', type:'text'},
            {label: 'Start Date', fieldName: 'Start_Date__c', type: 'Date'},
            {label: 'End Date', fieldName: 'End_Date__c', type: 'Date'}
            ]);
            let actionE = cmp.get("c.ExpGet");
            actionE.setParams({Hero : cmp.get("v.HeroId") });
            actionE.setCallback(this,function(response){
                if(response.getState() === "SUCCESS"){
                    cmp.set("v.ExpList", response.getReturnValue());
                    
                }
    
            })
            $A.enqueueAction(actionE);
    }
})