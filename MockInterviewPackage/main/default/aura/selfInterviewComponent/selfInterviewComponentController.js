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
        selfInterviewComponentHelper.doInitHelper();
    },
    
    //make the choose record to be public
    updatePublic : function(component, event, helper){
        selfInterviewComponentHelper.updatePublicHelper();
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
        selfInterviewComponentHelper.recordSkillHelper();
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
        selfInterviewComponentHelper.submitFeedbackHelper();
    }
    
})