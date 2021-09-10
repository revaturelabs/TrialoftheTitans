@isTest
public class ExamInterviewApexControllerTestClass {
    @TestSetup
    static void makeData(){
        Titan__c tTitan = new Titan__c(Name = 'Titan1', Technology__c = 'Salesforce');
        insert tTitan;
        Exam__c tExam = new Exam__c(Name = 'tExam');
        insert tExam;
        List<Exam_Question__c> tExams = new List<Exam_Question__c>();
        for(Integer i = 1; i < 100; i++){
            if(i < 50){
                tExams.add(new Exam_Question__c(Name = 'exam ' + i, Titan__c = null));
            }
            if(i > 50){
                tExams.add(new Exam_Question__c(Name = 'exam ' + i, Titan__c = tTitan.Id));
            }
        }
        insert tExams;
    }
    @isTest
    public static void testPullQuestionsPos(){
        List<Exam__c> tExam = [SELECT Id FROM Exam__c];
        List<Exam_Question__c> prac = ExamInterviewApexController.examFinder(tExam[0].Id);
        System.assertEquals(49, prac.size());
    }
    @isTest
    public static void testPullQuestionsNeg(){
        
        List<Exam__c> tExam = [SELECT Id FROM Exam__c];
        tExam.add(new Exam__c());
        List<Exam_Question__c> prac = ExamInterviewApexController.examFinder(tExam[1].Id);
        System.assertEquals(0, prac.size());
    }
}

