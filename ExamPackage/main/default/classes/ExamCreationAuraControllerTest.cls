/*
 * a lot of these test run under the assumption that all fields are not required; except for the name field.
 */
@isTest
public class ExamCreationAuraControllerTest {
	
    @testSetup
    static void setup(){
    	List<Exam_Question__c> examQuestionList = new List<Exam_Question__c>();
        for(Integer i = 0; i < 150; i++){
            examQuestionList.add(new Exam_Question__c(Name='examQuestion ' + i));
        }
        insert examQuestionList;
        List<Question_Pool__c> questionPoolList = new List<Question_Pool__c>();
        for(Integer i = 0; i < 20; i++){
            questionPoolList.add(new Question_Pool__c(Name='questionPool ' + i));
        }
        insert questionPoolList;
        List<Question_Assignment__c> questionAssignmentList = new List<Question_Assignment__c>();
        for(Integer i = 0; i < 20; i++){
            questionAssignmentList.add(new Question_Assignment__c(Exam_Question__c=examQuestionList[i].id, Question_Pool__c=questionPoolList[0].id));
        }
        for(Integer i = 20; i < 60; i++){
            questionAssignmentList.add(new Question_Assignment__c(Exam_Question__c=examQuestionList[i].id, Question_Pool__c=questionPoolList[1].id));
        }
        for(Integer i = 20; i < 80; i++){
            questionAssignmentList.add(new Question_Assignment__c(Exam_Question__c=examQuestionList[i].id, Question_Pool__c=questionPoolList[2].id));
        }
        for(Integer i = 60; i < 120; i++){
            questionAssignmentList.add(new Question_Assignment__c(Exam_Question__c=examQuestionList[i].id, Question_Pool__c=questionPoolList[3].id));
        }
        for(Integer i = 0; i < 150; i++){
            questionAssignmentList.add(new Question_Assignment__c(Exam_Question__c=examQuestionList[i].id, Question_Pool__c=questionPoolList[4].id));
        }
        // 310 question assignment created
        // questionPool 0 have 20
        // questionPool 1 have 40
        // questionPool 2 have 60
        // questionPool 3 have 60
        // questionPool 4 have 150
        // the other pool are just there for pages
        insert questionAssignmentList;
    }
    
    @isTest
    public static void testPositive(){
        
        // First method
        Map<Integer, List<ExamCreationAuraController.QuestionPoolWrapper>> getReturn = ExamCreationAuraController.getQuestionPool();
        
        // since there are 20 pools, so 2 key so calling size() on map should give us back 2
        System.assert(getReturn.size() == 2);
        List<Question_Pool__c> poolWithQuestions = [SELECT Id, Name, Number_Of_Questions__c FROM Question_Pool__c WHERE Number_Of_Questions__c > 0 ORDER BY Name];
        
        // check if the return map have the correct value
        // can check everything in wrapper, but if Id is correct, the other is likely also correct
        System.assert(getReturn.get(1)[0].poolId == poolWithQuestions[0].Id);
        System.assert(getReturn.get(1)[1].poolId == poolWithQuestions[1].Id);
        System.assert(getReturn.get(1)[2].poolId == poolWithQuestions[2].Id);
        System.assert(getReturn.get(1)[3].poolId == poolWithQuestions[3].Id);
        System.assert(getReturn.get(1)[4].poolId == poolWithQuestions[4].Id);
        
        // Second method
        List<Exam_Question__c> getReturnQuestion = ExamCreationAuraController.getExamQuestions(poolWithQuestions[0].Id);
        
        System.assert(getReturnQuestion.size() == 20);
        
        getReturnQuestion = ExamCreationAuraController.getExamQuestions(poolWithQuestions[4].Id);
        
        System.assert(getReturnQuestion.size() == 150);
        
        // Third Method
        // going to need an exam to test this
        
        Exam__c newEx = new Exam__c(Name='Test Exam');
        insert newEx;
        
        // now build a map, with question pool id as key, and some random number as value
        Map<Id, Integer> poolAndAmount = new Map<Id, Integer>();
        poolAndAmount.put(poolWithQuestions[0].id, 5);
        poolAndAmount.put(poolWithQuestions[1].id, 15);
        poolAndAmount.put(poolWithQuestions[2].id, 25);
        poolAndAmount.put(poolWithQuestions[3].id, 35);
        poolAndAmount.put(poolWithQuestions[4].id, 45);
        
        ExamCreationAuraController.createExamAssignment(newEx.Id, poolAndAmount);
        
        List<Exam_Pool_Assignment__c> examAssignments = [SELECT Id, Name, Number_To_Pull__c FROM Exam_Pool_Assignment__c WHERE Exam__c=:newEx.Id Order By Number_To_Pull__c ASC];
        
        System.assert(examAssignments.size() == 5);
        System.assert(examAssignments[0].Number_to_Pull__c == 5);    
        System.assert(examAssignments[1].Number_to_Pull__c == 15); 
        System.assert(examAssignments[2].Number_to_Pull__c == 25); 
        System.assert(examAssignments[3].Number_to_Pull__c == 35); 
        System.assert(examAssignments[4].Number_to_Pull__c == 45); 
    }
}