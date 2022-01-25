/////////////////////////////////////////////////////
//
//  Name: interviewQuestionClassTest.apxc
//  Author: An Huynh
//  Description: testing class for selfInterviewClass
//
///////////////////////////////////////////////////
@isTest
public class interviewQuestionClassTest {
    //set up data for the test
	@testSetup
    public static void setup(){
        Account acc = new Account(Name='ZZ');
        insert acc;
        Contact con = new Contact(FirstName='ZZ', Email='ZZ@bb.com');
       
        
        
        
        List<MI_Question_Pool__c> ques = new List<MI_Question_Pool__c>();
       
        for(Integer i=0; i<3; i++){
            MI_Question_Pool__c temp = new MI_Question_Pool__c(Question__c='Question '+i, Type__c='Soft skill');
            ques.add(temp);
        }
        for(Integer i=0; i<3; i++){
            MI_Question_Pool__c temp = new MI_Question_Pool__c(Question__c='Question '+i, Type__c='Technical');
            ques.add(temp);
        }
        for(Integer i=0; i<3; i++){
            MI_Question_Pool__c temp = new MI_Question_Pool__c(Question__c='Question '+i, Type__c='Other');
            ques.add(temp);
        }
        insert ques;
    }
    
    //Test all methods for interviewQuestionClass
    @isTest
    public static void testGetQuestions(){
        Test.startTest();
        Profile p = [SELECT Id FROM Profile WHERE Name='System Administrator'];
        User u = new User(Alias = 'standt', Email='ZZ@bb.com', 
            EmailEncodingKey='UTF-8', LastName='ZZ', LanguageLocaleKey='en_US', 
            LocaleSidKey='en_US', ProfileId = p.Id, 
            TimeZoneSidKey='America/Los_Angeles', UserName='anhuynhtesterbeta123@testorg.com');
        
        List<MI_Question_Pool__c> temp = interviewQuestionClass.getSoftSkillQuestions();
        List<MI_Question_Pool__c> temp1 = interviewQuestionClass.getTechSkillQuestions();
        List<MI_Question_Pool__c> temp2 = interviewQuestionClass.getOtherSkillQuestions();
        List<MI_Question_Pool__c> myQues = new List<MI_Question_Pool__c>();
        List<Mock_Interview_Self__c> mock = new List<Mock_Interview_Self__c>();
        List<Feedback__c> feed = new List<Feedback__c>();
        myQues.add(temp[0]);
        myQues.add(temp1[1]);
        myQues.add(temp2[2]);
        Id mocId = null;
        System.runAs(u){
        mocId = interviewQuestionClass.saveInterview(myQues, true, 'asd');
        Feedback__c myFeedback = new Feedback__c(Type__c='Self', Confidence__c=1, Fluency__c=2, Eye_Contact__c=3, Body_Language__c=4);
        interviewQuestionClass.saveSelfFeedback(mocId, myFeedback);
        mock = interviewQuestionClass.getMyInterview();
        feed = interviewQuestionClass.getAllFeedback();
        }
        
        
        Test.stopTest();
        System.assertEquals(temp.size(), 3);
        System.assertEquals(temp1.size(), 3);
        System.assertEquals(temp2.size(), 3);
        System.assertNotEquals(mocId, Null);
        System.assertEquals([SELECT Name FROM Feedback__c].size(), 1);
        System.assertEquals(mock.size(), 1);
        System.assertEquals(feed.size(), 1);
    }
    
    
}
