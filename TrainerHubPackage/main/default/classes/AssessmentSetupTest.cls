/////////////////////////////////////////////////////
//
//  Name: AssessmentSetupTest
//  Author: Kameron Fincher
//  Description: Utility class to create new data for 
//	the Cohort Page and Trainer Hub. It is ideal to 
//	run UserAccountSetup.UserSetup prior to this.
//	It's also best to run Setup first, then associateCohort
//	and finally QCSetup
//	
///////////////////////////////////////////////////
@isTest
public class AssessmentSetupTest {
	@testSetup
    static void Setup(){
    	UserAccountSetup.UserSetUp();
    }
    
    @isTest
    static void OverallTest(){
        AssessmentSetup.Setup();
        List<Hero_Assessment__c> heroAssessmentList = [SELECT Name FROM Hero_Assessment__c];
        List<Assessment__c> assessmentList = [SELECT Name FROM Assessment__c];
        System.assertNotEquals(0, heroAssessmentList.size());
        System.assertNotEquals(0, assessmentList.size());
        System.assertEquals(25, heroAssessmentList.size());
        System.assertEquals(5, assessmentList.size());
        
        AssessmentSetup.associateCohort();
        
        Cohort__c coh = [Select Name, Active__c from Cohort__c WHERE Active__c=true LIMIT 1];
        
        System.assertNotEquals(null,coh);
        
        AssessmentSetup.QCSetup('QC');
        
        List<QC_Question_Answer__c> QCQuesAns = [SELECT Name from QC_Question_Answer__c];
        List<QC_Interview__c> QCInt = [SELECT Name from QC_Interview__c];
        
        System.assertEquals(25, heroAssessmentList.size());
        System.assertEquals(5, assessmentList.size());
    }
    
}