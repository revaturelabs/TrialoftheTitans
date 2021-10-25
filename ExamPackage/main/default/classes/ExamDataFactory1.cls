


/////////////////////////////////////////////////////////////////////////////
//
//	Name: ExamDataFactory1
//	Authors: Matthew Nicholson and Omer Sade
//	Description: Creates data for testing functionality related to the
//				 Exam app.
//
/////////////////////////////////////////////////////////////////////////////



public class ExamDataFactory1{
    // Creates an exam with 40 questions and a question assignment for each question.
    // Each question can be assigned to the question pool.
    // Every question has an answer and every exam has a result.  
    public static void dataFactory(String examName, String questionPool, Integer timeLimit, Integer passingGrade) {
        Account testAccount = new Account(Name='Account');
        insert testAccount;
        Titan__c titanTest = new Titan__c(Name='Titan', Technology__c='Java');
        insert titanTest;
        Exam__c examTest = new Exam__c(Name = examName, Default_Time_Limit__c = timeLimit, Default_Passing_Grade__c = passingGrade);
        insert examTest;
        Exam_Result__c examResultTest = new Exam_Result__c(Exam__c=examTest.Id, Account__c=testAccount.Id);
        insert examResultTest;
        Question_Pool__c questionPoolTest = new Question_Pool__c(Name='questionPool');
        insert questionPoolTest;
        Exam_Pool_Assignment__c poolTest = new Exam_Pool_Assignment__c(Exam__c = examTest.Id, Question_Pool__c=questionPoolTest.Id);
        insert poolTest;
        List<Exam_Question__c> questionList = new List<Exam_Question__c>();
        for(Integer i=0; i<41;i++){
            Exam_Question__c examQuestionTest = new Exam_Question__c(Name='Test' + i, Question_Type__c = 'Matching', Question_Text__c = 'This is a text ' + i);
            questionList.add(examQuestionTest);
        }
        insert questionList;
        List<Hero_Answer__c> answerList = new List<Hero_Answer__c>();
        for(Integer j=0;j<20;j++){
            Hero_Answer__c heroAnswerTest = new Hero_Answer__c(Exam_Question__c=questionList[j].Id, Exam_Result__c=examResultTest.Id, Correct__c=True, Answer_Choice__c='This is the answer: ' + j);
            answerList.add(heroAnswerTest);
        }
        for(Integer j=20;j<41;j++){
            Hero_Answer__c heroAnswerTest = new Hero_Answer__c(Exam_Question__c=questionList[j].Id, Exam_Result__c=examResultTest.Id, Correct__c=False, Answer_Choice__c='This is the answer: ' + j);
            answerList.add(heroAnswerTest);
        }
        insert answerList;
        List<Question_Assignment__c> assignmentList = new List<Question_Assignment__c>();
        for(Integer k=0;k<20;k++){
            Question_Assignment__c questionAssignmentTest = new Question_Assignment__c(Exam_Question__c=questionList[k].Id, Question_Pool__c=questionPoolTest.Id);
            assignmentList.add(questionAssignmentTest);
        }
        insert assignmentList;
        Question_Flow_Helper__c flowTest = new Question_Flow_Helper__c(Name='Test');
        insert flowTest;
    }
}