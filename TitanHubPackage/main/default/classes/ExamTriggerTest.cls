@isTest
public class ExamTriggerTest {
    @TestSetup
    static void makeData(){
        //Curriculums first so accounts can reference them
        Curriculum__c c1 = new Curriculum__c();c1.Name='Cur1';c1.Technology__c='Salesforce';
        Curriculum__c c2 = new Curriculum__c();c2.Name='Cur2';c2.Technology__c='Salesforce';
        List<Curriculum__c> currs = new List<Curriculum__c>();currs.add(c1);currs.add(c2);
        insert currs;
        List<Curriculum__c> curr2 = [SELECT Id FROM Curriculum__c];
        List<Id> currIDs = new List<Id>();
        for(Curriculum__c curr : currs){currIDs.add(curr.Id);}
        
        //Accounts to create the exam results for.
        //Acc1 and Acc2 use the same titan; acc3 does not.
        List<Account> accs = new List<Account>();
        Account acc1 = new Account();acc1.Name='Place Holder';acc1.Curriculum__c=currIDs[0];accs.add(acc1);
        Account acc2 = new Account();acc2.Name='Lorem Ipsum';acc2.Curriculum__c=currIDs[0];accs.add(acc2);
        Account acc3 = new Account();acc3.Name='Sample Text';acc3.Curriculum__c=currIDs[1];accs.add(acc3);
        insert accs;

        

        //Titans for created exams to reference
        List<Titan__c> titans = new List<Titan__c>();
        Titan__c t1 = new Titan__c();t1.Name='Cronos';t1.Technology__c='Salesforce';t1.Curriculum__c=currIDs[0];
        Titan__c t2 = new Titan__c();t2.Name='Hyperion';t2.Technology__c='Salesforce';t2.Curriculum__c=currIDs[1];
        titans.add(t1);titans.add(t2);
        insert titans;

    }

    @isTest
    static void positiveTest(){
        //Insert a single exam
        Test.startTest();
        Exam__c newExam = new Exam__c();
        newExam.Name = 'Test Exam';
        Titan__c tmp = [SELECT Id, Name FROM Titan__c WHERE Name = 'Cronos' LIMIT 1];
        newExam.Titan__c = tmp.Id;
        insert newExam;
        List<Exam_Result__c> examResults = [SELECT Id FROM Exam_Result__c];
        Test.stopTest();

        //Because acc1 and acc2 from test setup use Cronos but acc3 uses hyperion,
        //we expect 2 results (from acc1 and acc2 but not acc3)
        Integer size = examResults.size();
        System.assertEquals(2, size);
    }

    @isTest
    static void multipleTest(){
        Test.startTest();
        Exam__c newExam = new Exam__c();
        newExam.Name = 'Test Exam';
        Titan__c tmp = [SELECT Id, Name FROM Titan__c WHERE Name = 'Cronos' LIMIT 1];
        newExam.Titan__c = tmp.Id;

        Exam__c newExam2 = new Exam__c();
        newExam2.Name = 'Test Exam 2';
        Titan__c tmpA = [SELECT Id, Name FROM Titan__c WHERE Name = 'Hyperion' LIMIT 1];
        newExam2.Titan__c = tmpA.Id;

        Exam__c newExam3 = new Exam__c();
        newExam3.Name = 'Test Exam 3';
        Titan__c tmpB = [SELECT Id, Name FROM Titan__c WHERE Name = 'Cronos' LIMIT 1];
        newExam3.Titan__c = tmpB.Id;

        List<Exam__c> newExams = new List<Exam__c>();
        newExams.add(newExam);newExams.add(newExam2);newExams.add(newExam3);
        insert newExams;
        List<Exam_Result__c> examResults = [SELECT Id FROM Exam_Result__c];
        Test.stopTest();

        //newExam and newExam3 reference Cronos, which has 2 associated accounts. 
        //newExam2 references Hyperion, which only has 1 associated account. 
        //2+1+2 = 5, so 5 expected results.
        Integer size = examResults.size();
        System.assertEquals(5, size);
    }


}
