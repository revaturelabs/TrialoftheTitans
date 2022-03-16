@isTest
public with sharing class IterationElevenTestCoverageFillTest {
    
    @TestSetup
    static void makeData(){
        Team__c tc = new Team__c(Name='Alchemy');
        insert tc;

        Squad__c sc = new Squad__c(Name='Perseus', Team__c = tc.id);
        insert sc;

        Curriculum__c cuc = new Curriculum__c();
        insert cuc;

        Account a = new Account(Name='TestUser', Squad__c = sc.Id, Curriculum__c=cuc.id);
        insert a;

        Contact c = new Contact(lastname='Fake User', AccountId=a.id);
        insert c;

        Titan__c titanc = new Titan__c(name='Salesforce', technology__c='Salesforce');
        insert titanc;


        UserRole userrole = [Select Id, DeveloperName From UserRole Where DeveloperName = 'CEO' Limit 1];

        User adminUser = [Select Id, UserRoleId From User Where Profile.Name='System Administrator' Limit 1];
        System.runAs(adminUser){
            Profile p2 = [SELECT Id FROM Profile WHERE Name='Hero'];

            User u = new User(Email='asdfasdf@testorg.com', 
                EmailEncodingKey='UTF-8', LastName='Test User', LanguageLocaleKey='en_US', 
                LocaleSidKey='en_US', ProfileId = p2.Id, Alias = 'TestUser',
                TimeZoneSidKey='America/Los_Angeles', UserName='asdfasdf@testorg.com',
                ContactId = c.id);
            insert u;
        }

        Exam__c ec = new Exam__c(Titan__c = titanc.id);
        insert ec;

        Exam_Result__c erc = new Exam_Result__c(Graded__c=true, Passing_Grade_Override__c=10, Account__c=a.Id, Exam__c=ec.Id);
        insert erc;

        Exam_Question__c eqc = new Exam_Question__c(name='Unladen Swallow');
        insert eqc;

        Hero_Answer__c hac = new Hero_Answer__c(Exam_Question__c=eqc.id, Exam_Result__c=erc.id, correct__c=true);
        insert hac;
        Hero_Answer__c hac2 = new Hero_Answer__c(Exam_Question__c=eqc.id, Exam_Result__c=erc.id, correct__c=true);
        insert hac2;




        
    }

    @isTest 
    public static void pathToTitanControllerTest()
    {
        Contact c = PathToTitanController.getContact();
        System.assert(c!=null);

        Account a = PathToTitanController.getAccount();
        System.assert(a!=null);

        Squad__c sc = PathToTitanController.getSquad();
        System.assert(sc!=null);

        Titan__c titanc = [SELECT Id FROM Titan__c WHERE Name='Salesforce'];

        List<Exam_Result__c> erc = PathToTitanController.getExamAndResultsList(titanc.Id, a.Id);

    }

    @isTest 
    public static void titanPagePortTest()
    {
        Titan__c titanc = [SELECT Id FROM Titan__c WHERE Name='Salesforce'];
        User tUser = [SELECT Id FROM User WHERE Alias = 'TestUser' LIMIT 1];
        System.runAs(tUser) 
        {
            List<Exam_Result__c> lerc = titanPagePortDetailsHelper.getExamInfo(titanc.Id);
            System.assertNotEquals(0, lerc.size());
        }
    }

    @isTest 
    public static void headerHelperTest()
    {
        
        User tUser = [SELECT Id FROM User WHERE Alias = 'TestUser' LIMIT 1];
        System.runAs(tUser)
        {
            Curriculum__c cuc = headerHelper.getTechInfo();
            System.assert(cuc!=null);
        }
    }

    @isTest 
    public static void heroHubUtilitiesCreateTest()
    {
        HeroHubTestUtilities.fullSetup();
        HeroHubTestUtilities.createTeams();
        HeroHubTestUtilities.createSquads();
    }

}