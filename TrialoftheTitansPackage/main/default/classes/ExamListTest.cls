@isTest
public class ExamListTest {
	@testSetup
    static void testSetup(){
        HeroHubTestUtilities.createUsers();
    }
    
    @isTest
    static void checkExams(){
        Exam__c newExam = new Exam__c(Name='testExam');
       	database.insert(newExam);
        Exam_Question__c newQuestion = new Exam_Question__C(Name='testQuestion');
        database.insert(newQuestion);
        Account userAcct = [SELECT Id FROM Account Where name = 'User' Limit 1];
        Exam_Result__c newResult = new Exam_Result__c(Status__c = 'Unassigned', Exam__c = newExam.Id, Account__c = userAcct.Id);
        database.insert(newResult);
        
        
       List<Exam__c> examsList = [SELECT Id, 
                                    Titan__r.Name, 
                                    Name,
                                    Next_Exam__c,
                                    (SELECT Pass__c, 
                                            Total_Answers__c, 
                                            Total_Correct__C,
                                     		Status__c,
                                            CreatedDate
                                            FROM Exam_Results__r 
                                     	       WHERE Account__c = :userAcct.Id 
                                            )
                                    FROM Exam__c];
        
        ExamList newList = new ExamList(examsList[0]);
        
        system.assert(newList.isPassed == false);
        system.assert(newList.assigned == false);
        
    }
    
    @isTest
    static void isAssigned() {
     	Exam__c newExam = new Exam__c(Name='testExam');
       	database.insert(newExam);
        Exam_Question__c newQuestion = new Exam_Question__C(Name='testQuestion');
        database.insert(newQuestion);
        Account userAcct = [SELECT Id FROM Account Where name = 'User' Limit 1];
        Exam_Result__c newResult = new Exam_Result__c(Status__c = 'Assigned', Exam__c = newExam.Id, Account__c = userAcct.Id);
        database.insert(newResult);
        
        
       List<Exam__c> examsList = [SELECT Id, 
                                    Titan__r.Name, 
                                    Name,
                                    Next_Exam__c,
                                    (SELECT Pass__c, 
                                            Total_Answers__c, 
                                            Total_Correct__C,
                                     		Status__c,
                                            CreatedDate
                                            FROM Exam_Results__r 
                                     	       WHERE Account__c = :userAcct.Id 
                                            )
                                    FROM Exam__c];
        
        ExamList newList = new ExamList(examsList[0]);
        
        system.assert(newList.assigned == true);
    }
}