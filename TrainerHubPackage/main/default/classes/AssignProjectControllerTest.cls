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

        try {
            insert a;
            insert b;
            insert c;
            insert d;
            insert p;
            listAccs.add('testacc1');
            listAccs.add('testacc2');
            listCohs.add('testcoh1');
            listCohs.add('testcoh2');
            AssignProjectController.assignProject('individual', listAccs, p.Id);
            AssignProjectController.assignProject('cohort', listCohs, p.Id);
        } catch(Exception e) {
            system.debug(e.getMessage());
        }

        List<Account> listAccsAfter = new List<Account>();
        List<Cohort__c> listCohsAfter = new List<Cohort__c>();
        List<Id> accIds = new List<Id>();
        List<Id> cohIds = new List<Id>();
        accIds.add(a.Id);
        accIds.add(b.Id);
        cohIds.add(c.Id);
        cohIds.add(d.Id);
        try {
            listAccsAfter = [SELECT Id,Name,Project__c,Project__r.Name FROM Account WHERE Id IN :accIds];
            listCohsAfter = [SELECT Id,Name,Project__c,Project__r.Name FROM Cohort__c WHERE Id IN :cohIds];
        } catch (Exception e) {
            system.debug(e.getMessage());
        }

        System.assertEquals('P1', listAccsAfter[0].Project__r.Name);
        System.assertEquals('P1', listAccsAfter[1].Project__r.Name);
        System.assertEquals('P1', listCohsAfter[0].Project__r.Name);
        System.assertEquals('P1', listCohsAfter[1].Project__r.Name);
    }
}
