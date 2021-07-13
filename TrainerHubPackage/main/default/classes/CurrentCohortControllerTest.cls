/////////////////////////////////////////////////////
//
//  Name: CurrentCohortControllerTest
//  Author: Kameron Fincher
//  Description: Test for CurrentCohortController
//	
///////////////////////////////////////////////////
@isTest
public class CurrentCohortControllerTest {
    @testSetup
    static void DataSetup(){
    	UserAccountSetup.UserSetUp();
    }
    
    
    @isTest
    static void PositiveTest(){
        AssessmentSetup.associateCohort();
        AssessmentSetup.Setup();
        List<CurrentCohortController.Pair> data = CurrentCohortController.getData();
         
        System.assertEquals(4,data.size());
    }
    
    @isTest
    static void NegativeTest(){
        AssessmentSetup.associateCohort();
        AssessmentSetup.Setup();
        AssessmentSetup.QCSetup('QC');
        List<CurrentCohortController.Pair> data = CurrentCohortController.getData();
         
        System.assertNotEquals(4,data.size());
    }
}