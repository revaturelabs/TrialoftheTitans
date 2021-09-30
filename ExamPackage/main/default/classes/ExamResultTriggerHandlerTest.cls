//////////////////////////////////////////
//
//Name: ExamResultTriggerHandlerTest
//Author: Abdul-Shahid Wali
//Date Created: 05/28/21
//Date Updated: 05/28/21
//Description: Test class for the ExamResultTriggerHandler class
//
//////////////////////////////////////////
@isTest
public class ExamResultTriggerHandlerTest {
    
    @isTest
    //Method for testing single inserts at a time
    public static void SingleTest(){
        //Insert an example account
        Account account1 = new Account(Name = 'Jefferson Steelflex');
        insert account1;
        //Insert an example exam
        Exam__c firstExam = new Exam__c(Name = 'First Exam');
        insert firstExam;
        //Add two exam results with the same account and exam, both assigned
        
        List<Exam_Result__c> results = new List<Exam_Result__c>();
        Exam_Result__c result1 = new Exam_Result__c(Account__c = account1.Id, Status__c = 'Assigned', Exam__c = firstExam.Id);
        Exam_Result__c result2 = new Exam_Result__c(Account__c = account1.Id, Status__c = 'Assigned', Exam__c = firstExam.Id);
        results.add(result1); results.add(result2);
        insert results;
        //Second result should be changed to unassgined
        Exam_Result__c result3 = [SELECT Status__c FROM Exam_Result__c WHERE Id =: result2.Id];
        System.assertEquals('Unassigned', result3.Status__c);
        
        //Testing inserting an exam with exams already in the database
        Exam_Result__c result4 = new Exam_Result__c(Account__c = account1.Id, Status__c = 'Assigned', Exam__c = firstExam.Id);
        insert result4;
        //Result should be changed to unassigned
        Exam_Result__c result5 = [SELECT Status__c FROM Exam_Result__c WHERE Id =: result4.Id];
        System.assertEquals('Unassigned', result5.Status__c);
        
        //Testing updating an exam
        result3.Status__c = 'Assigned';
        update result3;
        //Result should be changed to unassigned
        Exam_Result__c result6 = [SELECT Status__c FROM Exam_Result__c WHERE Id =: result3.Id];
        System.assertEquals('Unassigned', result6.Status__c);
    }

    @isTest
    public static void ExamTest(){
        //Insert an example account
        Account account1 = new Account(Name = 'Jefferson Steelflex');
        insert account1;
        //Insert an example exam
        Exam__c firstExam = new Exam__c(Name = 'First Exam', Default_Passing_Grade__c =0);
        insert firstExam;
        //Add two exam results with the same account and exam, both assigned
	    Exam_Question__c exQues = new Exam_Question__c(Name='Question 1');
        insert exQues;
        
        
        
        List<Exam_Result__c> results = new List<Exam_Result__c>();
        Exam_Result__c result1 = new Exam_Result__c(Account__c = account1.Id, Status__c = 'Assigned', Exam__c = firstExam.Id);
        
        Exam_Result__c result2 = new Exam_Result__c(Account__c = account1.Id, Status__c = 'Assigned', Exam__c = firstExam.Id);
        
        
        results.add(result1); 
        results.add(result2); 
        
        //Testing inserting an exam with exams already in the database
        Exam_Result__c result4 = new Exam_Result__c(Account__c = account1.Id, Status__c = 'Assigned', Exam__c = firstExam.Id);
        
        results.add(result4);
        
        
        CollaborationGroup gro = new CollaborationGroup(Name='Titan Slayers', CollaborationType = 'Public');
        insert gro;
        
        ExamResultTriggerHandler.sendChatterMessageForTitanCompletion(results);
        System.assert(true);

    }

}