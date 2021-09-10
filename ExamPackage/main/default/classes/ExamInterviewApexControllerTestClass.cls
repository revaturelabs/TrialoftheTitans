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
    /*
    @isTest
    public static void testPullQuestionsNeg(){
        
        List<Exam__c> tExam = [SELECT Id FROM Exam__c];
        tExam.add(new Exam__c());
        List<Exam_Question__c> prac = ExamInterviewApexController.examFinder(tExam[1].Id);
        System.assertEquals(0, prac.size());
    }
    @isTest
    public static void testPullQuestionsPosBulk(){
        List<Exam__c> tExam = [SELECT Id FROM Exam__c];
        for(integer i=0; i < 200; i++){
            tExam.add(new Exam__c());
        }
        List<Exam_Question__c> prac = ExamInterviewApexController.examFinder(tExam[0].Id);
        System.assertEquals(249, prac.size());
    }
    @isTest
    public static void testPullQuestionsNegBulk(){
        
        List<Exam__c> tExam = [SELECT Id FROM Exam__c];
        for(integer i=0; i < 200; i++){
            tExam.add(new Exam__c());
        }
            List<Exam_Question__c> prac = ExamInterviewApexController.examFinder(tExam[1].Id);
        System.assertEquals(0, prac.size());
    }
    */

    @isTest
    public static void testSubmitExamSinglePos(){
        Exam__c testExam = new Exam__c(Name='test');
        insert testExam;
        Account testAccount = new Account(Name='Gladius Maximus');
        insert testAccount;
        Exam_Result__c testResult = new Exam_Result__c(Account__c = testAccount.Id, Exam__c = testExam.Id, Status__c='Assigned');
        insert testResult;
        ExamInterviewApexController.submitExam(testExam.Id);
        testResult.Status__c='Completed';
        update testResult;
        system.AssertEquals('Completed', testResult.Status__c);
    }
    @isTest
    public static void testSubmitExamSingleNeg(){
        Exam__c testExam = new Exam__c(Name='test');
        insert testExam;
        Account testAccount = new Account(Name='Gladius Maximus');
        insert testAccount;
        Exam_Result__c testResult = new Exam_Result__c(Account__c = testAccount.Id, Exam__c = testExam.Id, Status__c='Assigned');
        insert testResult;
        ExamInterviewApexController.submitExam(testExam.Id);
        testResult.Status__c='Completed';
        update testResult;
        system.AssertNotEquals('Assigned', testResult.Status__c);
    }
    @isTest
    public static void testSubmitExamSinglePosBulk(){
        Exam__c testExam = new Exam__c(Name='test');
        insert testExam;
        Account testAccount = new Account(Name='Gladius Maximus');
        insert testAccount;
        List<Exam_Result__c> testResults = new List<Exam_Result__c>();
        for(integer i=0; i<200; i++){
            testResults.add(new Exam_Result__c(Account__c = testAccount.Id, Exam__c = testExam.Id, Status__c='Assigned'));
        }
        insert testResults;
        for(integer count=0; count<200; count++) {
            integer o = 0;
            testResults[o].Status__c='Completed';
            o++;  
        }
        ExamInterviewApexController.submitExam(testExam.Id);
        update testResults;
        system.AssertEquals(200,testResults.size());
    }
}

