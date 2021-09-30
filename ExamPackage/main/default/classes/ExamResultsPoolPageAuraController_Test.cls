//////////////////////////////////////////
//
//Name: ExamResultsPoolPageAuraController_Test
//Author: Miguel McCrary
//Date Created: 06/27/21
//Date Updated: 06/28/21
//Description: Test class for the ExamResultsPoolPageAuraController class
//
//////////////////////////////////////////
@isTest
public class ExamResultsPoolPageAuraController_Test {

    @testSetup
    static void setup(){
        // create a new curriculum
        Curriculum__c newCurriculum = new Curriculum__c(Name='Salesforce');
        insert newCurriculum;

        //create a new question pool
       Question_Pool__c newQuestionPool = new Question_Pool__c(Name = 'Apex Testing');
       insert newQuestionPool;

        //create new accounts
        List<Account> userAccounts = new List<Account>();
        for(Integer i = 0; i < 5; i++){
            Account newAccount = new Account(name='User'+i);
            userAccounts.add(newAccount);
        }
        insert userAccounts;

        //create new titans
        List<Titan__c> newTitans = new List<Titan__c>();
        List<String> titanNames = new List<String>{'Process Automation', 'Data Modeling', 'Apex'};
        for(String name : titanNames){
            Titan__c newTitan = new Titan__c(Name = name, Technology__c = newCurriculum.Name,  Curriculum__c = newCurriculum.Id);
            newTitans.add(newTitan);  
        }
        insert newTitans;

        //creat new exams
        List<Exam__c> newExams = new List<Exam__c>();
        for(Titan__c titan : newTitans){
            for(Integer i = 0; i < 3; i++){
                Exam__C newExam = new Exam__c( Name='testExam'+ i, Default_Passing_Grade__c = 65.0, Titan__c = titan.Id );
                newExams.add(newExam);
            }   
        }
        insert newExams;

        //Create new exam questions
        List<Exam_Question__c> newQuestions = new List<Exam_Question__C>();
            for(Integer i = 0; i < 5; i++){
                Exam_Question__C newQuestion = new Exam_Question__c( Name = 'Test' + i );
                newQuestions.add(newQuestion);
        }
        insert newQuestions;

        //create new question assignments
        List<Question_Assignment__c> newQuestionAssignmentList = new List<Question_Assignment__c>();
        for(Exam_Question__c examQuestions: newQuestions){
                Question_Assignment__c newQuestionAssignment = new Question_Assignment__c
                (Question_Pool__c = newQuestionPool.Id, Exam_Question__C = examQuestions.Id );
                
                newQuestionAssignmentList.add(newQuestionAssignment);
        }
        insert newQuestionAssignmentList;

        //create exam assignments
        List< Exam_Pool_Assignment__c> newExamAssignments = new List< Exam_Pool_Assignment__c>();
        for(Exam__c exam: newExams){
            for(Integer i = 0; i < 5; i++){
                Exam_Pool_Assignment__c newExAssign = new  Exam_Pool_Assignment__c
                (Exam__c = exam.id, question_Pool__c = newQuestionPool.id);

                newExamAssignments.add(newExAssign);
            }
        }
        insert newExamAssignments;
        
        //create new exam results
        List<Exam_Result__c> newResults = new List<Exam_Result__c>();
        
        for(Exam__c exam: newExams){
            for(Account acc: userAccounts){
                Exam_Result__c newResult = new Exam_Result__c(Exam__c = exam.Id, Account__c = acc.Id);
                if(Math.round(Math.random()) == 1){
                    newResult.Graded__c = true;
                }
               newResults.add(newResult);
            }
        }
        insert newResults;

        //generate hero answers based on exam results
        List<Hero_Answer__c> newAnswers = new List<Hero_Answer__c>();
        for(Exam_Question__c question : newQuestions){ 
            for(Exam_Result__c result : newResults){
            	Hero_Answer__c newAnswer = new Hero_Answer__c(Exam_Question__c = question.id, Exam_Result__c = result.id);
                if(Math.random() < .85){ 
                    newAnswer.Correct__c = true;
                }
                else{
                	newAnswer.Correct__c = false;
                }
                newAnswers.add(newAnswer);
            }
        }
        insert newAnswers;
    }

    @isTest
    public static void testPositive(){

        String ExamResultId = [SELECT Id FROM Exam_Result__c LIMIT 1].Id;
        List<String> getReturnAll =  ExamResultsPoolPageAuraController.GetAllExamResultPoolQuestions(ExamResultId);
  
        //first method positive        
        List<String> allExamResultPoolQuestions = new List<String>();

        for(Question_Assignment__c qa : [SELECT Exam_Question__c, Question_Pool__c, Question_Pool__r.Name 
        FROM Question_Assignment__c 
        WHERE Exam_Question__c IN (SELECT Exam_Question__c FROM Hero_Answer__c 
        WHERE Exam_Result__c = :examResultId)]){

        allExamResultPoolQuestions.add(qa.Question_Pool__r.Name);
        
        }
        System.debug('Pool Name for each Question: ' + allExamResultPoolQuestions);
        System.assert(allExamResultPoolQuestions == getReturnAll);

        //second method positive
        List<String> getReturnCorrect = ExamResultsPoolPageAuraController.GetCorrectExamResultPoolQuestions(ExamResultId);
        List<String> correctExamResultPoolQuestions = new List<String>();

        for(Question_Assignment__c qa : [SELECT Exam_Question__c, Question_Pool__c, Question_Pool__r.Name
        FROM Question_Assignment__c 
        WHERE Exam_Question__c IN 
        (SELECT Exam_Question__c FROM Hero_Answer__c 
        WHERE Exam_Result__c = :examResultId AND Correct__c = True)]){

        correctExamResultPoolQuestions.add(qa.Question_Pool__r.Name);
        
        }
        System.debug('Pool Name for each Correct Question: ' + correctExamResultPoolQuestions);
        System.assert(correctExamResultPoolQuestions == getReturnCorrect);

    }

    @isTest
    public static void testNegative(){

        String emptyString = '';
        List<String> getReturnAll =  ExamResultsPoolPageAuraController.GetAllExamResultPoolQuestions(emptyString);
  
        //first method negative     
        List<String> allExamResultPoolQuestions = new List<String>();

        for(Question_Assignment__c qa : [SELECT Exam_Question__c, Question_Pool__c, Question_Pool__r.Name 
        FROM Question_Assignment__c 
        WHERE Exam_Question__c IN (SELECT Exam_Question__c FROM Hero_Answer__c 
        WHERE Exam_Result__c = :emptyString)]){

            allExamResultPoolQuestions.add(qa.Question_Pool__r.Name);
        }
        System.debug('Pool Name for each Question: ' + allExamResultPoolQuestions);
        System.assert(getReturnAll == allExamResultPoolQuestions);

        //second method negative
        List<String> getReturnCorrect = ExamResultsPoolPageAuraController.GetCorrectExamResultPoolQuestions(emptyString);
        List<String> correctExamResultPoolQuestions = new List<String>();

        for(Question_Assignment__c qa : [SELECT Exam_Question__c, Question_Pool__c, Question_Pool__r.Name
        FROM Question_Assignment__c 
        WHERE Exam_Question__c IN 
        (SELECT Exam_Question__c FROM Hero_Answer__c 
        WHERE Exam_Result__c = :emptyString AND Correct__c = True)]){

            correctExamResultPoolQuestions.add(qa.Question_Pool__r.Name);
        }
        
        System.debug('Pool Name for each Correct Question: ' + correctExamResultPoolQuestions);
        System.assert(getReturnCorrect == correctExamResultPoolQuestions);
        
    }

}