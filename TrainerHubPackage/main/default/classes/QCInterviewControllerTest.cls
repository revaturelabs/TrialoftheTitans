////////////////////////////////////////////////////
//
// Name: QC Interview Apex Controller Test
// Author: Josue Cisneros
// Description: Test the SOQL server side controller
//              for retrieving QC Interview data
//
////////////////////////////////////////////////////

@isTest
private class QCInterviewControllerTest {
    
    @isTest
        private static void TestPositive(){
            List<QC_Interview__c> listOfInterviews= new List<QC_Interview__c>();
            List<Cohort__c> listOfCohortRef = new List<Cohort__c>();
            QC_Interview__c q;
            Cohort__c c;
            for(Integer i=0;i<4;i++){
                c = new Cohort__c(Name='Testing'+string.valueof(i));
                listOfCohortRef.add(c);
            }
            insert listOfCohortRef;

            for(Integer i=0;i<10;i++){
                q = new QC_Interview__c(Name='Testing'+string.valueof(i), Cohort__c=listOfCohortRef[0].Id, Week__c= 'Week 1', QC_Score__c = 86);
                listOfInterviews.add(q);
            } 
            
            for(Integer i=10;i<20;i++){
                q = new QC_Interview__c(Name='Testing'+string.valueof(i), Cohort__c=listOfCohortRef[1].Id, Week__c= 'Week 1', QC_Score__c = 70);
                listOfInterviews.add(q);
            }

            for(Integer i=20;i<30;i++){
                q = new QC_Interview__c(Name='Testing'+string.valueof(i), Cohort__c=listOfCohortRef[2].Id, Week__c= 'Week 1', QC_Score__c = 87);
                listOfInterviews.add(q);
            }

            for(Integer i=30;i<40;i++){
                q = new QC_Interview__c(Name='Testing'+string.valueof(i), Cohort__c=listOfCohortRef[3].Id, Week__c= 'Week 1', QC_Score__c = 86);
                listOfInterviews.add(q);
            }
    
            insert listOfInterviews;
    
            List<QC_Interview__c> listOfInterviewsTest = QCInterviewController.InterviewList(listOfCohortRef[3].Id);
            System.assert( listOfInterviewsTest != null); 
        }
    
        @isTest
        private static void TestNegative(){
    
            List<QC_Interview__c> listOfInterviewsTest = QCInterviewController.InterviewList('Test Cohort');
            System.assert( listOfInterviewsTest.isEmpty(), true); 
        }
        
}