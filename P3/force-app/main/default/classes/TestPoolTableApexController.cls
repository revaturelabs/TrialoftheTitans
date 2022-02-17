// Phong Nguyen
// 5/28/2021
// Test for Pool Table component
@isTest
public class TestPoolTableApexController {
    @isTest(SeeAllData=false)
    static void TestPoolTableController(){
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
        for(Integer i = 0; i < 1; i++){
        	testPool.add(new Question_Pool__c(Name='apexPool'+i));
        }
       	insert testPool;
        
        //Adding questions to exam Question
        List <Question_Pool__c> pools = [SELECT Id FROM Question_Pool__c];
        List <Exam_Question__c> questions = [SELECT Id FROM Exam_Question__c];
        Integer myMethod = QuestionTableApexController.addQues2Pool(pools,questions);

        
        // Testing GetQues method
        List <PoolTableApexController.TableRow> myWrapper = new  List<PoolTableApexController.TableRow>();
        myWrapper = PoolTableApexController.GetQues('a',10,1,null);
        myWrapper = PoolTableApexController.GetQues('a',10,1,pools);
        //System.debug(myWrapper);
        System.debug(myWrapper.size());
        
        // Testing GetPool method
        List <PoolTableApexController.TableRow2> myWrapper2 = new  List<PoolTableApexController.TableRow2>();
        myWrapper2 = PoolTableApexController.GetPool();
        //System.debug(myWrapper);
        System.debug(myWrapper2.size());
        System.assertEquals(myWrapper2.size(),1);
        
        Integer myMethod2 = PoolTableApexController.deleteQuesPool(pools,questions);

        
    }
}