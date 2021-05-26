@isTest
public class TestQuestionTableApexController {
    @isTest(SeeAllData=false)
    static void TestQuestionTableController(){
        // Mock data for test
        // Exam
        Exam__c myExam = new Exam__c(Name='PD1');
        insert myExam;
        
        // Exam Questions
        List <Exam_Question__c> testQues = new List <Exam_Question__c> ();
        for(Integer i = 0; i < 10; i++){
        	testQues.add(new Exam_Question__c(Name='apex'+i));
        }
        insert testQues;
        
        // Pools
        List <Question_Pool__c> testPool = new List <Question_Pool__c> ();
        for(Integer i = 0; i < 5; i++){
        	testPool.add(new Question_Pool__c(Name='apexPool'+i));
        }
       	insert testPool;
        
        // Testing GetQues method
        List <QuestionTableApexController.TableRow> myWrapper = new  List<QuestionTableApexController.TableRow>();
        myWrapper = QuestionTableApexController.GetQues('a',10,1);
        //System.debug(myWrapper);
        System.debug(myWrapper.size());
        System.assertEquals(myWrapper.size(),10);
        
        // Testing GetPool method
        List <QuestionTableApexController.TableRow2> myWrapper2 = new  List<QuestionTableApexController.TableRow2>();
        myWrapper2 = QuestionTableApexController.GetPool();
        //System.debug(myWrapper);
        System.debug(myWrapper2.size());
        System.assertEquals(myWrapper2.size(),5);
        
        //Adding questions to exam Question
        List <Question_Pool__c> pools = [SELECT Id FROM Question_Pool__c];
        List <Exam_Question__c> questions = [SELECT Id FROM Exam_Question__c];
        Integer myMethod = QuestionTableApexController.addQues2Pool(pools,questions);
        //System.debug(myWrapper);
        System.debug(myMethod);
        System.assertEquals(myMethod,50);
        
    }
}