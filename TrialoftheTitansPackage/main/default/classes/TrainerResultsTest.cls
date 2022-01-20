/////////////////////////////////////////////////////
//
//  Name: TrainerResultsTest
//  Author: Frank Berni
//  Description: Testing methods for the TrainerResultsAccController which is used by TrainerResultsAccordion Component and its nested components.
//
///////////////////////////////////////////////////

@IsTest
public class TrainerResultsTest {
    
    @TestSetup
    public static void createData(){
        List<Cohort__c> ch = new List<Cohort__c>();
        List<Account> hl = new List<Account>();
        List<MI_Question_Pool__c> qp = new List<MI_Question_Pool__c>();
        List<Mock_Interview_Self__c> mk = new List<Mock_Interview_Self__c>();
        List<Feedback__c> fb = new List<Feedback__c>();
        
        Cohort__c c = new Cohort__c(Name='Test Cohort');
        ch.add(c);
        insert ch;
        
        Account a = new Account(Name='Test Hero',Cohort__c=c.Id);
        hl.add(a);
        insert hl;
        
        MI_Question_Pool__c q = new MI_Question_Pool__c(Type__c='Soft Skill',
                                                         Question__c='Test Question', 
                                                         Suggested_Answer__c='Test Answer');
        qp.add(q);
        insert qp;
        
        Mock_Interview_Self__c m = new Mock_Interview_Self__c(Account__c=a.ID, MI_Question_Pool__c=q.Id, Public__c=true);
        mk.add(m);
        insert m;
        
        Feedback__c f1 = new Feedback__c(Mock_Interview_Self__c=m.Id, 
                                        Type__c='Self',
                                        Confidence__c=3,
                                        Eye_Contact__c=4,
                                        Fluency__c=2,
                                        Body_Language__c=4,
                                        Comments__c='Test Comment');
        Feedback__c f2 = new Feedback__c(Mock_Interview_Self__c=m.Id, 
                                        Type__c='Peer',
                                        Confidence__c=2,
                                        Eye_Contact__c=5,
                                        Fluency__c=3,
                                        Body_Language__c=5,
                                        Comments__c='Test Comment 2');
        fb.add(f1);
        fb.add(f2);
        insert fb;
           
    }
    
    @IsTest
    public static void testGrabHeroes(){
        Test.startTest();
            List<Account> acc = TrainerResultsAccController.grabHeroes();
        Test.stopTest();
        system.assertEquals(acc.size(),1);    
    }
    
    @IsTest
    public static void testGrabCohorts(){
        Test.startTest();
            List<Cohort__c> coh = TrainerResultsAccController.grabCohorts();
        Test.stopTest();
        system.assertEquals(coh.size(),1);    
    }
    
    @IsTest
    public static void testGrabFeedback(){
        String name = 'Test Hero';
        Test.startTest();
            List<Feedback__c> feedback = TrainerResultsAccController.grabFeedback(name);
        Test.stopTest();
        system.assertEquals(feedback.size(),2);    
    }
    
    @IsTest
    public static void testGrabAggHero(){
        String name = 'Test Hero';
        Test.startTest();
            List<aggregateResult> aggH = TrainerResultsAccController.grabAggHero(name);
        Test.stopTest();
        system.assertNotEquals(aggH,Null);
        system.assertEquals(aggH.size(),1);    
    }
    
    @IsTest
    public static void testGrabAggCohort(){
        String name = 'Test Cohort';
        Test.startTest();
            List<aggregateResult> aggC = TrainerResultsAccController.grabAggCohort(name);
        Test.stopTest();
        system.assertNotEquals(aggC,Null);
        system.assertEquals(aggC.size(),1);    
    }

}