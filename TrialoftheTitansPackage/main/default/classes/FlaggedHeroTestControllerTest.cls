////////////////////////////////////////////////////
//
// Name: Flagged Hero Apex Controller Test
// Author: Josue Cisneros
// Description: Test the SOQL server side controller
//              for retrieving QC Flag data
//
////////////////////////////////////////////////////

@isTest
private class FlaggedHeroTestControllerTest {
    @isTest
        private static void TestPositive(){
            List<QC_Flag__c> listOfFlags = new List<QC_Flag__c>();
            List<QC_Interview__c> listOfInterviews = new List<QC_Interview__c>();
            List<Cohort__c> listOfCohortRef = new List<Cohort__c>();
            QC_Flag__c f;
            QC_Interview__c q;
            Cohort__c c;
            for(Integer i=0;i<1;i++){
                c = new Cohort__c(Name='Cohort'+string.valueof(i));
                listOfCohortRef.add(c);
            }
            insert listOfCohortRef;

            for(Integer i=0;i<20;i++){
                q = new QC_Interview__c(Name='Interview'+string.valueof(i), Cohort__c=listOfCohortRef[0].Id, Week__c= 'Week 1', QC_Score__c = 70 + i);
                listOfInterviews.add(q);
            }
            insert listOfInterviews;

            for(Integer i=0; i<20;i++){
                f = new QC_Flag__c(Name='Flagged'+string.valueof(i), QC_Interview__c=listOfInterviews[i].Id, Type__c='Uncertainty');
            }
    
            List<QC_Flag__c> listOfFlagsTest = FlaggedHeroController.HeroList();
            System.assert( listOfFlagsTest != null); 
        }
    
        @isTest
        private static void TestNegative(){
    
            List<QC_Flag__c> listOfFlagsTest = FlaggedHeroController.HeroList();
            System.assert( listOfFlagsTest.isEmpty(), true); 
        }
}