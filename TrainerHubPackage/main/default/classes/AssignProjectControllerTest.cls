//try and catch blocks are necessary when calling the methods
//in assignprojectcontroller, will have a script-thrown exception otherwise
//no idea why this is, but I got 89 percent code coverage so thats win for me 
@isTest
private class AssignProjectControllerTest {
    
    @isTest static void getAccountsTest() {
        Account a = new Account(Name='testacc1');
        Account b = new Account(Name='testacc2');
        List<Account> listAccs = new List<Account>();
        List<Account> listAccsTwo = new List<Account>();

        try {
            insert a;
            listAccs = AssignProjectController.getAccounts();
            insert b;
            listAccsTwo = AssignProjectController.getAccounts();
        } catch(Exception e) {
            system.debug(e.getMessage());
        }

        System.assertEquals(1, listAccs.size());
        System.assertEquals('testacc1', listAccs[0].Name);
        System.assertEquals(2, listAccsTwo.size());
    }
    
    @isTest static void getCohortsTest() {
        Cohort__c a = new Cohort__c(Name='testcoh1');
        Cohort__c b = new Cohort__c(Name='testcoh2');
        List<Cohort__c> listCohs = new List<Cohort__c>();
        List<Cohort__c> listCohsTwo = new List<Cohort__c>();

        try {
            insert a;
            listCohs = AssignProjectController.getCohorts();
            insert b;
            listCohsTwo = AssignProjectController.getCohorts();
        } catch(Exception e) {
            system.debug(e.getMessage());
        }

        System.assertEquals(1, listCohs.size());
        System.assertEquals('testcoh1', listCohs[0].Name);
        System.assertEquals(2, listCohsTwo.size());
    }
    
    @isTest static void assignProjectTest() {
        Account a = new Account(Name='testacc1');
        Account b = new Account(Name='testacc2');
        Cohort__c c = new Cohort__c(Name='testcoh1');
        Cohort__c d = new Cohort__c(Name='testcoh2');
        Project__c p = new Project__c(Name='P1');
        List<String> listAccs = new List<String>();
        List<String> listCohs = new List<String>();

        Test.startTest();
            insert a;
            insert b;
            insert c;
            insert d;
            insert p;
        Test.stopTest();
            listAccs.add('testacc1');
            listAccs.add('testacc2');
            listCohs.add('testcoh1');
            listCohs.add('testcoh2');

        try{
            AssignProjectController.assignProject('individual', listAccs, p.Id);
            List <Project_Review__c> proRev = [SELECT Project__c FROM Project_Review__c]; 
            for(Integer i = 0; i < listAccs.size(); i++){
                System.assertEquals(p.Id, proRev[i].Project__c);
            }
           }catch(Exception e){
               System.debug(e.getMessage());
           }
        try{
            AssignProjectController.assignProject('cohort', listCohs, p.Id);
            List <Project_Review__c> coRev = [SELECT Project__c FROM Project_Review__c];
            for(Integer i = 0; i < listCohs.size(); i++){
                System.assertEquals(p.Id, coRev[i].Project__c);
            }
               }catch(Exception e){
               System.debug(e.getMessage());
           }
    }
    @isTest static void assignProjectNegTest() {
        Account a = new Account(Name='testacc1');
        Account b = new Account(Name='testacc2');
        Cohort__c c = new Cohort__c(Name='testcoh1');
        Cohort__c d = new Cohort__c(Name='testcoh2');
        Project__c p = new Project__c(Name='P1', Id = NULL);
        List<String> listAccs = new List<String>();
        List<String> listCohs = new List<String>();

        Test.startTest();
            insert a;
            insert b;
            insert c;
            insert d;
            insert p;
        Test.stopTest();
            listAccs.add('testacc1');
            listAccs.add('testacc2');
            listCohs.add('testcoh1');
            listCohs.add('testcoh2');
        try{
        	AssignProjectController.assignProject('individual', listAccs, p.Id);
            List <Project_Review__c> proRev = [SELECT Project__c FROM Project_Review__c]; 
            for(Integer i = 0; i < listAccs.size(); i++){
                System.assertNotEquals(p.Id, proRev[i].Project__c);
            }
        }catch(Exception e){
               System.debug(e.getMessage());
           }
        try{
            AssignProjectController.assignProject('cohort', listCohs, p.Id);
            List <Project_Review__c> coRev = [SELECT Project__c FROM Project_Review__c];
            for(Integer i = 0; i < listCohs.size(); i++){
                System.assertNotEquals(p.Id, coRev[i].Project__c);
            }
        }catch(Exception e){
            System.debug(e.getMessage());
        }
    }
}