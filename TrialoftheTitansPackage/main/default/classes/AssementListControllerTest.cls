////////////////////////////////////////////////////
//
// Name: Assessment List Apex Controller Test
// Author: Josue Cisneros
// Description: Test the SOQL server side controller
//              for retrieving Assessment data
//
////////////////////////////////////////////////////

@isTest
private class AssementListControllerTest {

    @isTest
    private static void TestPositive(){
        List<Assessment__c> listOfAssessments= new List<Assessment__c>();
        Assessment__c a;
        for(Integer i=0;i<10;i++){
            a = new Assessment__c(Name='Testing'+string.valueof(i), Type__c='Project');
            listOfAssessments.add(a);
        }
        for(Integer i=10;i<20;i++){
            a = new Assessment__c(Name='Testing'+string.valueof(i), Type__c='1-on-1');
            listOfAssessments.add(a);
        } for(Integer i=20;i<30;i++){
            a = new Assessment__c(Name='Testing'+string.valueof(i), Type__c='Misc');
            listOfAssessments.add(a);
        }

        insert listOfAssessments;

        List<Assessment__c> listOfAssessmentsTest = AssessmentListController.AssessmentList();
        System.assert( listOfAssessmentsTest != null); 


    }

    @isTest
    private static void TestNegative(){

        List<Assessment__c> listOfAssessments= AssessmentListController.AssessmentList();
        System.assert( listOfAssessments.isEmpty(), true); 
    }
}
