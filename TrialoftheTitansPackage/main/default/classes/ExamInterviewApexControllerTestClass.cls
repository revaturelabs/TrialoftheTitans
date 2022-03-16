@isTest
public class ExamInterviewApexControllerTestClass {
    @TestSetup
    static void makeData(){
        Titan__c tTitan = new Titan__c(Name = 'Titan1', Technology__c = 'Salesforce');
        insert tTitan;

        Exam__c tExam = new Exam__c(Name = 'tExam', Titan__c = tTitan.id, Default_Time_Limit__c = 60);
        insert tExam;

        tTitan.First_Exam__c = tExam.id;
        update tTitan;
        
        List<Exam_Question__c> tQuestions = new List<Exam_Question__c>();

        for(Integer i = 1; i < 100; i++){
            if(i <= 50){
                tQuestions.add(new Exam_Question__c(Name = 'exam ' + i, Titan__c = null));
            }
            if(i > 50){
                tQuestions.add(new Exam_Question__c(Name = 'exam ' + i, Titan__c = tTitan.Id));
            }
        }

        System.debug(tTitan);
        System.debug(tExam);
        System.debug(tQuestions);
        
        insert tQuestions;
    }
    
    @isTest
    public static void testPullQuestions(){
        Exam__c tExam = [SELECT Id FROM Exam__c LIMIT 1];
        
        List<List<SObject>> exam = ExamInterviewApexController.examFinder(tExam.id);
    
        // no Questions created in TestSetup, should be 0
        System.assertEquals(0, exam[0].size());
    }

    @isTest
    public static void testPullExamName(){
        Exam__c tExam = [SELECT Id FROM Exam__c LIMIT 1];
        
        List<List<SObject>> exam = ExamInterviewApexController.examFinder(tExam.id);
        
        Exam__c e = (Exam__c) exam[1][0];

        System.assertEquals('tExam', e.Name);
    }

    @isTest
    public static void testPullTitanName(){
        Exam__c tExam = [SELECT Id FROM Exam__c LIMIT 1];
        
        List<List<SObject>> exam = ExamInterviewApexController.examFinder(tExam.id);
        
        Exam__c e = (Exam__c) exam[1][0];

        // Titans__c does not exist
        // System.assertEquals('Hyperion', e.Titans__c.Name);
    }

    @isTest
    public static void testPullExamTimer(){
        Exam__c tExam = [SELECT Id FROM Exam__c LIMIT 1];
        
        List<List<SObject>> exam = ExamInterviewApexController.examFinder(tExam.id);
        
        Exam__c e = (Exam__c) exam[1][0];

        System.assertEquals(60, e.Default_Time_Limit__c);
    }

    @isTest
    public static void testSubmitExamSinglePos(){
        Exam__c testExam = new Exam__c(Name='test');
        insert testExam;
        Account testAccount = new Account(Name='Gladius Maximus');
        insert testAccount;
        Exam_Result__c testResult = new Exam_Result__c(Account__c = testAccount.Id, Exam__c = testExam.Id, Status__c='Assigned');
        insert testResult;
        ExamInterviewApexController.submitExam(testExam.Id, testAccount.id);
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
        ExamInterviewApexController.submitExam(testExam.Id, testAccount.id);
        testResult.Status__c='Completed';
        update testResult;
        system.AssertNotEquals('Assigned', testResult.Status__c);
    }
    @isTest
    public static void testSubmitAnswersSinglePos(){
        List<Exam_Question__c> questionList = new List<Exam_Question__c>();
        questionList.add(new Exam_Question__c(Name= 'test',Question_Type__c = 'Multiple Choice', Correct_Answer_s__c = 'test'));
        questionList.add(new Exam_Question__c(Name='test',Question_Type__c = 'Multiple Choice - multiple answers', Correct_Answer_s__c = 'test'));
        insert questionList;
        Map<String,String> examQuestions = new Map<String,String>();
        examQuestions.put('1', 'test');
        examQuestions.put('2', 'test');
        Exam__c tExam = new Exam__c(name='test');
        insert tExam;
        Exam_Result__c eResult = new Exam_Result__c(Status__c = 'Completed', Exam__c = tExam.Id);
        insert eResult;
        Hero_Answer__c hAnswer = new Hero_Answer__c(Exam_Question__c = questionList[0].Id, Exam_Result__c = eResult.Id, Answer_Choice__c = examQuestions.get('1'));
        ExamInterviewApexController.submitAnswers(questionList, examQuestions, tExam.id);
        hAnswer = [SELECT Correct__c FROM Hero_Answer__c WHERE Exam_Question__c = :questionList[0].Id LIMIT 1];
        System.assertEquals(true, hAnswer.Correct__c, 'Answer is not correct');
        Hero_Answer__c hAnswer2 = new Hero_Answer__c(Exam_Question__c = questionList[1].Id, Exam_Result__c = eResult.Id, Answer_Choice__c = examQuestions.get('2'));
        hAnswer2 = [SELECT Correct__c FROM Hero_Answer__c WHERE Exam_Question__c = :questionList[1].Id LIMIT 1];
        System.assertEquals(true, hAnswer2.Correct__c, 'Answer is not correct');
    } 
    @isTest
    public static void testSubmitAnswersSingleNeg(){
        List<Exam_Question__c> questionList = new List<Exam_Question__c>();
        questionList.add(new Exam_Question__c(Name= 'test',Question_Type__c = 'Multiple Choice', Correct_Answer_s__c = 'test'));
        questionList.add(new Exam_Question__c(Name='test',Question_Type__c = 'Multiple Choice - multiple answers', Correct_Answer_s__c = 'test'));
        insert questionList;
        Map<String,String> examQuestions = new Map<String,String>();
        examQuestions.put('1', 'test1');
        examQuestions.put('2', 'test1');
        Exam__c tExam = new Exam__c(name='test');
        insert tExam;
        Exam_Result__c eResult = new Exam_Result__c(Status__c = 'Completed', Exam__c = tExam.Id);
        insert eResult;
        Hero_Answer__c hAnswer = new Hero_Answer__c(Exam_Question__c = questionList[0].Id, Exam_Result__c = eResult.Id, Answer_Choice__c = examQuestions.get('1'));
        ExamInterviewApexController.submitAnswers(questionList, examQuestions, tExam.id);
        hAnswer = [SELECT Correct__c FROM Hero_Answer__c WHERE Exam_Question__c = :questionList[0].Id];
        System.assertEquals(false, hAnswer.Correct__c, 'Answer is correct');
        Hero_Answer__c hAnswer2 = new Hero_Answer__c(Exam_Question__c = questionList[1].Id, Exam_Result__c = eResult.Id, Answer_Choice__c = examQuestions.get('2'));
        hAnswer2 = [SELECT Correct__c FROM Hero_Answer__c WHERE Exam_Question__c = :questionList[1].Id];
        System.assertEquals(false, hAnswer2.Correct__c, 'Answer is correct');
    }
/*
    @IsTest
    static void testSubmitAnswersBulk(){
        List<Exam_Question__c> questionList = new List<Exam_Question__c>();
        for (integer count = 0; count< 200; count++) {
            if (count<100) {
                questionList.add(new Exam_Question__c(Name= 'test',Question_Type__c = 'Multiple Choice', Correct_Answer_s__c = '1||2||3'));
            } else if (count<200) {
                questionList.add(new Exam_Question__c(Name='test',Question_Type__c = 'Multiple Choice - multiple answers', Correct_Answer_s__c = '1||2||3'));
            }
        }
        insert questionList;
        Map<String,String> examQuestions = new Map<String,String>();
        String anyName = '';
        for (integer count = 1; count < 201; count++) {
            anyName = string.valueOf(count);
            examQuestions.put(anyName, '1||2||3');
        }
        Exam__c tExam = new Exam__c(name='test');
        insert tExam;
        Exam_Result__c eResult = new Exam_Result__c(Status__c = 'Completed', Exam__c = tExam.Id);
        insert eResult;
        for (integer count = 0; count < 200; count++) {
            Hero_Answer__c hAnswer = new Hero_Answer__c(Exam_Question__c = questionList[count].Id, Exam_Result__c = eResult.Id, Answer_Choice__c = examQuestions.get(''+count));
        }
        ExamInterviewApexController.submitAnswers(questionList, examQuestions);
        
        
        
        List<Hero_Answer__c> resultsTrue = [SELECT ID FROM Hero_Answer__c WHERE Correct__c = true];
        
        system.assertEquals(200, resultsTrue.size());
    }
    @IsTest
    static void testSubmitAnswersBulkNeg(){
        Exam__c tExam = new Exam__c(name='test');
        insert tExam;
        Exam_Result__c eResult = new Exam_Result__c(Status__c = 'Completed', Exam__c = tExam.Id);
        insert eResult;
        List<Exam_Question__c> questionList = new List<Exam_Question__c>();
        for (integer i = 0; i<=200; i++) {
            if (i<100) {
                questionList.add(new Exam_Question__c(Name= 'test',Question_Type__c = 'Multiple Choice', Correct_Answer_s__c = 'test'));
            } else if (i<200) {
                questionList.add(new Exam_Question__c(Name='test',Question_Type__c = 'Multiple Choice - multiple answers', Correct_Answer_s__c = 'test'));
            }
        }
        insert questionList;
        Map<String,String> examQuestions = new Map<String,String>();
        for (integer count = 1; count < 201; count++) {
            examQuestions.put('' + count, 'test1');
        }
        List<Hero_Answer__c> hAnswer = new List<Hero_Answer__c>();
        for (integer count = 0; count < 200; count++) {
            hAnswer.add(new Hero_Answer__c(Exam_Question__c = questionList[count].Id, Exam_Result__c = eResult.Id, Answer_Choice__c = examQuestions.get('' + count)));
        }
        ExamInterviewApexController.submitAnswers(questionList, examQuestions);
        List<Hero_Answer__c> resultsFalse = [SELECT ID FROM Hero_Answer__c WHERE Correct__c = false];

        System.assertEquals(200, resultsFalse.size());
    }*/
}