/////////////////////////////////////////////////////
//
//  Name: selfInterviewComponentController.js
//  Author: Some Author
//  Description: some Description
//
///////////////////////////////////////////////////


({
    
    //randomize the question for each question type, and capture the list of current interview for this user
    doInit : function(component, event, helper) {
        //MY CURRENT INTERVIEWS
        let interviews = component.get("c.getMyInterview");
        interviews.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
                let result = response.getReturnValue();
                component.set("v.myInterviews", result);
            }
        });
     
        //SOFT SKILL
        let softSkill = component.get("c.getSoftSkillQuestions");
        softSkill.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
                let result = response.getReturnValue();
                let randomNum = Math.floor(Math.random() * result.length);
                component.set("v.softSkillQuestions", result[randomNum]);
            }
        });
        //TECHNICAL 
        let techSkill = component.get("c.getTechSkillQuestions");
        techSkill.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
                let result = response.getReturnValue();
                let randomNum = Math.floor(Math.random() * result.length);
                component.set("v.techSkillQuestions", result[randomNum]);
            }
        });
        //OTHER
        let otherSkill = component.get("c.getOtherSkillQuestions");
        otherSkill.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
                let result = response.getReturnValue();
                let randomNum = Math.floor(Math.random() * result.length);
                component.set("v.otherSkillQuestions", result[randomNum]);
            }
        });
        $A.enqueueAction(interviews);
        $A.enqueueAction(softSkill);
        $A.enqueueAction(techSkill);
        $A.enqueueAction(otherSkill);
    },
    
    //make the choose record to be public
    updatePublic : function(component, event, helper){
        var RecordIndexStr = event.getSource().get("v.value");
        var RecordIndexInt = parseInt(RecordIndexStr);
        var newResources = component.get("v.newResources");
        
        newResources.splice(RecordIndexInt, 1);
        console.log(JSON.stringify(newResources));
        
        let interList = component.get("v.myInterviews");
        
        console.log(JSON.stringify(interList));
    },
    
    
    // visualize the solfskill question and disable the other two question type
    softSkillChoice : function(component, event, helper) {
        component.set("v.isSoftSkill", true);
        component.set("v.isTechnical", false);
        component.set("v.isOther", false);
        //event.getSource().set('v.disabled',true);
        
        
	},
    
    // visualize the technical question and disable the other two question type
    techSkillChoice : function(component, event, helper) {
        component.set("v.isTechnical", true);
    	component.set("v.isSoftSkill", false);
        component.set("v.isOther", false);
        //event.getSource().set('v.disabled',true);
	},
    
    // visualize the other question and disable the other two question type
    otherChoice : function(component, event, helper) {
        component.set("v.isOther", true);
        component.set("v.isTechnical", false);
    	component.set("v.isSoftSkill", false);
        //event.getSource().set('v.disabled',true);
	},
    
    //pop up the record window and save interview record
    recordSkill : function(component, event, helper){
        component.set("v.isRecording", true);
        event.getSource().set('v.disabled',true);
        let pub = component.get("v.isPublic");
        let questions =[component.get("v.softSkillQuestions"), component.get("v.techSkillQuestions"), component.get("v.otherSkillQuestions")];

        let record = component.get("c.saveInterview");
        //CHANGE THE VIDEO WHEN WE HAVE THE DATATYPE OF VIDEO
        record.setParams({question:questions, isPub:pub, video:"AAA"});
        
        record.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
				let result = response.getReturnValue();
                
                component.set("v.mockID", result);
				console.log(result);
            } 
        });
        $A.enqueueAction(record);
    },
    
    //set the public option for interview 
    makePublic : function(component, event, helper){
        let temp = component.get("v.isPublic");
        component.set("v.isPublic", !temp);
        
    },
    
    
    //uploading the video
    submitInterview : function(component, event, helper){
        component.set("v.isInterviewing", false);
        component.set("v.isFeedback", true);
        
    },
    
    //submit the feedback for the self interview
    submitFeedback : function(component, event, helper){
      
        let interID = component.get("v.mockID");
        let feed = component.get("v.feedback");
        if(feed.Confidence__c >5 || feed.Confidence__c <1 ||
          feed.Fluency__c >5  || feed.Fluency__c <1||
          feed.Eye_Contact__c>5|| feed.Eye_Contact__c<1||
          feed.Body_Language__c>5 || feed.Body_Language__c<1){
          	component.set("v.isError", true);
        }
        else{
            let record = component.get("c.saveSelfFeedback");
            record.setParams({interviewID:interID, myFeedback:feed});
            record.setCallback(this,function(response){
                if(response.getState() == "SUCCESS"){
                    
                } 
            });
            $A.enqueueAction(record);
            component.set("v.isSucc", true);
            component.set("v.isFeedback", false);
        }
        
    }
    
})