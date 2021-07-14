/////////////////////////////////////////////////////
//
//  Name: interviewQuestionClass.apxc
//  Author: An Huynh
//  Description: grab questions depending on their type and save the mockinterview record, also create a new feedback for the new mock interview
//
///////////////////////////////////////////////////

public class interviewQuestionClass {
    private static Id currentID = null;
    
    //return MI_Question_Pool__c records filtered by soft skill
    //return: List<MI_Question_Pool__c>
    @auraEnabled
    public static List<MI_Question_Pool__c> getSoftSkillQuestions(){
        List<MI_Question_Pool__c> questions = [SELECT Question__c, Type__c, Suggested_Answer__c FROM MI_Question_Pool__c WHERE Type__c = 'Soft skill'];
        return questions;
    }
    
    //return MI_Question_Pool__c records filtered by technical skill
    //return: List<MI_Question_Pool__c>
    @auraEnabled
    public static List<MI_Question_Pool__c> getTechSkillQuestions(){
        List<MI_Question_Pool__c> questions = [SELECT Question__c, Type__c, Suggested_Answer__c FROM MI_Question_Pool__c WHERE Type__c = 'Technical'];
        return questions;
    }
	
    //return MI_Question_Pool__c records filtered by other skill
    //return: List<MI_Question_Pool__c>
    @auraEnabled
    public static List<MI_Question_Pool__c> getOtherSkillQuestions(){
        List<MI_Question_Pool__c> questions = [SELECT Question__c, Type__c, Suggested_Answer__c FROM MI_Question_Pool__c WHERE Type__c = 'Other'];
        return questions;
    }
    
    //create a new Mock_Interview_Self__c record and return its ID after the insertion
    //question: the list of 3 questions that used to create the interview
    //isPub: indicate public field on the Mock_Interview_Self__c object
    //video: video reference
    //return the interview ID
    @AuraEnabled
    public static Id saveInterview(List<MI_Question_Pool__c> question, Boolean isPub, String video){
        Account acc = [SELECT Name, (SELECT Name FROM Contacts WHERE Name=:UserInfo.GetName()) FROM Account WHERE Name=:UserInfo.GetName()  LIMIT 1];
        Mock_Interview_Self__c moc = new Mock_Interview_Self__c(Account__c=acc.Id, MI_Question_Pool_Soft_Skill__c=question[0].Id, 
                                                                MI_Question_Pool_Tech_Skill__c=question[1].Id, MI_Question_Pool_Other__c=question[2].Id, Public__c=isPub);
        insert moc;
        System.debug('THIS IS WRONG');
        System.debug(moc.Id);
        return moc.Id;
        
    }
    
    //create a new feedback for a given mock interview ID
    //interviewID: the interview ID which being provided feedback
    //myFeedback: the feedback Object with all the information
    @AuraEnabled
    public static void saveSelfFeedback(Id interviewID, Feedback__c myFeedback){
        myFeedback.Mock_Interview_Self__c = interviewID;
        myFeedback.Type__c = 'Self';
        insert myFeedback;
    }
    
    //retrieve a list of the user's interview list
    //return: List<Mock_Interview_Self__c>
    @AuraEnabled
    public static List<Mock_Interview_Self__c> getMyInterview(){
        Account acc = [SELECT Name, (SELECT Name FROM Contacts WHERE Name=:UserInfo.GetName()) FROM Account WHERE Name=:UserInfo.GetName()  LIMIT 1];
        List<Mock_Interview_Self__c> temp = [SELECT Name, CreatedDate, Public__c FROM Mock_Interview_Self__c WHERE Account__c=:acc.Id];
        System.debug(temp);
        return temp;
    }
    
    //retrieve all mockinterview
    @AuraEnabled
    public static List<Feedback__c> getAllFeedback(){
        List<Feedback__c> temp = [SELECT Confidence__c, Fluency__c, Type__c, Eye_Contact__c, Body_Language__c, Mock_Interview_Self__r.Account__r.Name FROM Feedback__c];
    	return temp;
    }
    
}
