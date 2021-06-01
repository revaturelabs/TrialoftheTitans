({   
    hSetTitans : function(component, event, helper) {
        let titanList = component.get("c.getTitans");
        titanList.setCallback(this, function(response){
            if(response.getState() == "SUCCESS"){
                component.set("v.TitanList", response.getReturnValue());
                console.log("Returned Titans: ")
                console.log(response.getReturnValue())
            }
        })
        $A.enqueueAction(titanList);
    },
    
    hSetExams : function(component, event, helper) {
        let activeTitan = component.get("v.activeTitan.Id");
        let examsList = component.get("c.getExams");
        examsList.setParams({titanId : activeTitan});
        titanList.setCallback(this, function(response){
            if(response.getState() == "SUCCESS"){
                component.set("v.examList", response.getReturnValue());
                console.log("Returned Exams: ");
                console.log(response.getReturnValue());
            }
        })
        
        $A.enqueueAction(examsList);
    },
    
    hSetName : function(component, event, helper) {
        let userName = component.get("c.fetchUser");
        userName.setCallback(this, function(response){
            if(response.getState() == "SUCCESS"){
                component.set("v.AccountInfo", response.getReturnValue());
                console.log(response.getReturnValue());
            }
            
        })
        $A.enqueueAction(userName);
    },
    
    //	hNavigate : uses switch statement to show the Titan according to hShowTitan# method
    hNavigate : function(component, event, helper) {
        console.log("hNavigate function:");
        var titanList = component.get("v.TitanList");
        console.log(titanList);
        
        for(let Titan in titanList){
            let selectedTitan = titanList[Titan].Id;
            console.log('Selected Titan Id:' + selectedTitan);            
            let titanDiv = document.getElementById(selectedTitan);
            console.log('titanDiv:' + titanDiv);
            $A.util.addClass(titanDiv, "toggle-hide");
        }
        let titanId = event.currentTarget.dataset.titan;
        console.log('Current Titan Id:' + titanId);
        let titanDiv = document.querySelector("#" + titanId);
        $A.util.removeClass(titanDiv, "toggle-hide");
        
    }
})