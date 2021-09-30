@isTest
public class UserTriggerHandlerTest {
    
    // Classes I need: Curriculum, Exam, Titan, Account
    @TestSetup
    private static void SetupTests() {
        Curriculum__c curric1 = new Curriculum__c(
            name = 'Curriculum 1',
            technology__c = 'Salesforce'
        );
        Curriculum__c curric2 = new Curriculum__c(
            name = 'Curriculum 2',
            technology__c = 'Java'
        );
        Insert curric1;
        Insert curric2;

        List<Titan__c> salesforceTitans = new List<Titan__c>();
        salesforceTitans.add( new Titan__c(
            curriculum__c = curric1.id,
            name = 'Security and Access',
            technology__c = 'Salesforce'
        ));
        salesforceTitans.add( new Titan__c(
            curriculum__c = curric1.id,
            name = 'Apex',
            technology__c = 'Salesforce'
        ));
        salesforceTitans.add( new Titan__c(
            curriculum__c = curric1.id,
            name = 'Process Automation',
            technology__c = 'Salesforce'
        ));
        Insert salesforceTitans;

        List<Titan__c> javaTitans = new List<Titan__c>();
        javaTitans.add( new Titan__c(
            curriculum__c = curric2.id,
            name = 'Java Basics',
            technology__c = 'Java'
        ));
        javaTitans.add( new Titan__c(
            curriculum__c = curric2.id,
            name = 'API',
            technology__c = 'Java'
        ));
        Insert javaTitans;

        List<Exam__c> salesforceExams = new List<Exam__c>();
        for ( Titan__c titan : salesforceTitans ) {
            for ( Integer index = 1; index <= 5; index++ ) {
                salesforceExams.add( new Exam__c(
                    titan__c = titan.id,
                    name = titan.name + ' - Exam ' + index
                ));
            }
        }
        Insert salesforceExams;

        List<Exam__c> javaExams = new List<Exam__c>();
        for ( Titan__c titan : javaTitans ) {
            for ( Integer index = 1; index <= 5; index++ ) {
                javaExams.add( new Exam__c(
                    titan__c = titan.id,
                    name = titan.name + ' - Exam ' + index
                ));
            }
        }
        Insert javaExams;

        Account salesforceHero = new Account(
            name = 'Salesforce Hero',
            curriculum__c = curric1.id
        );
        Account javaHero = new Account(
            name = 'Java Hero',
            curriculum__c = curric2.id
        );
        Insert salesforceHero;
        Insert javaHero;
    }

    @isTest
    private static void TP_GetUserToAccountMap() {
        Profile p = [SELECT id FROM Profile WHERE name = 'Standard User' LIMIT 1];
        User sfUser = new User(
            firstName = 'Salesforce',
            lastName = 'Hero',
            email = 'test2@test.com',
            alias = 'testHero',
            username = 'testhero_@test.com',
            communityNickname = 'testHero1234',
            localeSidKey = 'en_US',
            timeZoneSidKey = 'GMT',
            profileId = p.id,
            languageLocaleKey = 'en_US',
            emailEncodingKey = 'UTF-8'
        );

        List<User> userList = new List<User>();
        userList.add( sfUser );

        Map<User, Account> accountMap = UserTriggerHandler.GetUserToAccountMap( userList );

        Account expected = [SELECT id FROM Account WHERE name = 'Salesforce Hero' LIMIT 1];
        System.assertEquals( expected.id, accountMap.get( sfUser ).id );
    }

    @isTest
    private static void TN_GetUserToAccountMap() {
        Map<User, Account> accountMap = UserTriggerhandler.GetUserToAccountMap( new List<User>() );

        System.assertEquals( 0, accountMap.size() );

        Profile p = [SELECT id FROM Profile WHERE name = 'Standard User' LIMIT 1];
        User unlinkedUser = new User(
            firstName = 'Empty',
            lastName = 'Hero',
            email = 'test2@test.com',
            alias = 'testHero',
            username = 'testhero_@test.com',
            communityNickname = 'testHero1234',
            localeSidKey = 'en_US',
            timeZoneSidKey = 'GMT',
            profileId = p.id,
            languageLocaleKey = 'en_US',
            emailEncodingKey = 'UTF-8'
        );

        List<User> brokenList = new List<User>();
        brokenList.add( unlinkedUser );

        Map<User, Account> badMap = UserTriggerHandler.GetUserToAccountMap( brokenList );
        System.assertEquals( 0, badMap.size() );
    }

    @isTest
    private static void TP_GetUserToCurriculumMap() {
        Profile p = [SELECT id FROM Profile WHERE name = 'Standard User' LIMIT 1];
        User sfUser = new User(
            firstName = 'Salesforce',
            lastName = 'Hero',
            email = 'test2@test.com',
            alias = 'testHero',
            username = 'testhero_@test.com',
            communityNickname = 'testHero1234',
            localeSidKey = 'en_US',
            timeZoneSidKey = 'GMT',
            profileId = p.id,
            languageLocaleKey = 'en_US',
            emailEncodingKey = 'UTF-8'
        );
        List<User> userList = new List<User>();
        userList.add( sfUser );

        Map<User, Curriculum__c> curriculumMap = UserTriggerHandler.GetUserToCurriculumMap( userList );

        Curriculum__c expected = [SELECT id FROM Curriculum__c WHERE technology__c = 'Salesforce' LIMIT 1];
        System.assertEquals( expected.id, curriculumMap.get( sfUser ).id );
    }

    @isTest
    private static void TN_GetUserToCurriculumMap() {
        Map<User, Curriculum__c> accountMap = UserTriggerhandler.GetUserToCurriculumMap( new List<User>() );

        System.assertEquals( 0, accountMap.size() );

        Profile p = [SELECT id FROM Profile WHERE name = 'Standard User' LIMIT 1];
        User unlinkedUser = new User(
            firstName = 'Empty',
            lastName = 'Hero',
            email = 'test2@test.com',
            alias = 'testHero',
            username = 'testhero_@test.com',
            communityNickname = 'testHero1234',
            localeSidKey = 'en_US',
            timeZoneSidKey = 'GMT',
            profileId = p.id,
            languageLocaleKey = 'en_US',
            emailEncodingKey = 'UTF-8'
        );

        List<User> brokenList = new List<User>();
        brokenList.add( unlinkedUser );

        Map<User, Curriculum__c> badMap = UserTriggerHandler.GetUserToCurriculumMap( brokenList );
        System.assertEquals( 0, badMap.size() );
    }

    @isTest
    private static void TP_GetRelevantExams() {
        Curriculum__c sfCurriculum = [SELECT id FROM Curriculum__c WHERE technology__c = 'Salesforce' LIMIT 1];
        List<Exam__c> allExams = [SELECT id, Titan__r.Curriculum__c FROM Exam__c];

        List<Exam__c> relevantExams = UserTriggerHandler.GetRelevantExams( sfCurriculum, allExams );

        List<Exam__c> expectedExams = [SELECT id FROM Exam__c WHERE Titan__r.Curriculum__r.technology__c = 'Salesforce'];
        System.assertEquals( 15, relevantExams.size() );
        System.assertNotEquals( allExams.size(), relevantExams.size() );
        System.assertEquals( expectedExams.size(), relevantExams.size() );
    }

    @isTest
    private static void TN_GetRelevantExams() {
        List<Exam__c> allExams = [SELECT id, Titan__r.Curriculum__c FROM Exam__c];
        List<Exam__c> emptyList = UserTriggerHandler.GetRelevantExams( null, allExams );
        System.assertEquals( 0, emptyList.size() );

        Curriculum__c sfCurriculum = [SELECT id FROM Curriculum__c WHERE technology__c = 'Salesforce' LIMIT 1];
        emptyList = UserTriggerHandler.GetRelevantExams( sfCurriculum, new List<Exam__c>() );
        System.assertEquals( 0, emptyList.size() );

        emptyList = UserTriggerHandler.GetRelevantExams( sfCurriculum, null );
        System.assertEquals( 0, emptyList.size() );
    }

    @isTest
    private static void TP_GetUserToExamMap() {
        List<User> userList = new List<User>();
        Profile p = [SELECT id FROM Profile WHERE name = 'Standard User' LIMIT 1];
        User sfUser = new User(
            firstName = 'Salesforce',
            lastName = 'Hero',
            email = 'test2@test.com',
            alias = 'testHero',
            username = 'testhero_@test.com',
            communityNickname = 'testHero1234',
            localeSidKey = 'en_US',
            timeZoneSidKey = 'GMT',
            profileId = p.id,
            languageLocaleKey = 'en_US',
            emailEncodingKey = 'UTF-8'
        );
        User javaUser = new User(
            firstName = 'Java',
            lastName = 'Hero',
            email = 'testjava2@test.com',
            alias = 'testHeroJava',
            username = 'testherojava_@test.com',
            communityNickname = 'testHeroJava1234',
            localeSidKey = 'en_US',
            timeZoneSidKey = 'GMT',
            profileId = p.id,
            languageLocaleKey = 'en_US',
            emailEncodingKey = 'UTF-8'
        );
        List<Exam__c> sfExams = [SELECT id FROM Exam__c WHERE Titan__r.Curriculum__r.technology__c = 'Salesforce'];
        List<Exam__c> javaExams = [SELECT id FROM Exam__c WHERE Titan__r.Curriculum__r.technology__c = 'Java'];
        userList.add( sfUser );
        userList.add( javaUser );

        Map< User, List<Exam__c> > examMap = UserTriggerHandler.GetUserToExamMap( userList );

        System.assertEquals( userList.size(), examMap.size() );
        System.assertEquals( sfExams.size(), examMap.get( sfUser ).size() );
        System.assertEquals( javaExams.size(), examMap.get( javaUser ).size() );
        System.assertNotEquals( sfExams.size(), examMap.get( javaUser ).size() );
        System.assertNotEquals( javaExams.size(), examMap.get( sfUser ).size() );
    }

    @isTest
    private static void TN_GetUserToExamMap() {
        Map< User, List<Exam__c> > examMap = UserTriggerhandler.GetUserToExamMap( new List<User>() );
        System.assertEquals( 0, examMap.size() );

        Profile p = [SELECT id FROM Profile WHERE name = 'Standard User' LIMIT 1];
        User unlinkedUser = new User(
            firstName = 'Empty',
            lastName = 'Hero',
            email = 'test2@test.com',
            alias = 'testHero',
            username = 'testhero_@test.com',
            communityNickname = 'testHero1234',
            localeSidKey = 'en_US',
            timeZoneSidKey = 'GMT',
            profileId = p.id,
            languageLocaleKey = 'en_US',
            emailEncodingKey = 'UTF-8'
        );

        List<User> brokenList = new List<User>();
        brokenList.add( unlinkedUser );

        Map< User, List<Exam__c> > badMap = UserTriggerHandler.GetUserToExamMap( brokenList );
        System.assertEquals( brokenList.size(), badMap.size() );
        System.assertEquals( 0, badMap.get( unlinkedUser ).size() );
    }

    @isTest
    private static void TP_AssignExams() {
        List<User> userList = new List<User>();
        Profile p = [SELECT id FROM Profile WHERE name = 'Standard User' LIMIT 1];
        User sfUser = new User(
            firstName = 'Salesforce',
            lastName = 'Hero',
            email = 'test2@test.com',
            alias = 'testHero',
            username = 'testhero_@test.com',
            communityNickname = 'testHero1234',
            localeSidKey = 'en_US',
            timeZoneSidKey = 'GMT',
            profileId = p.id,
            languageLocaleKey = 'en_US',
            emailEncodingKey = 'UTF-8'
        );
        userList.add( sfUser );

        UserTriggerHandler.AssignExams( userList );
        List<Exam_Result__c> createdResults = [SELECT account__c FROM Exam_Result__c];
        List<Exam__c> sfExams = [SELECT id FROM Exam__c WHERE Titan__r.Curriculum__r.technology__c = 'Salesforce'];
        String userName = sfUser.firstName + ' ' + sfUser.lastName;
        Account expectedAcc = [SELECT id FROM Account WHERE name = :userName LIMIT 1];

        System.assertEquals( sfExams.size(), createdResults.size() );
        for ( Exam_Result__c result : createdResults ) {
            System.assertEquals( expectedAcc.id, result.account__c );
        }
    }

    @isTest
    private static void TN_AssignExams() {
        UserTriggerHandler.AssignExams( null );
        List<Exam_Result__c> createdResults = [SELECT account__c FROM Exam_Result__c];
        System.assertEquals( 0, createdResults.size() );

        UserTriggerHandler.AssignExams( new List<User>() );
        createdResults = [SELECT account__c FROM Exam_Result__c];
        System.assertEquals( 0, createdResults.size() );

        List<User> userList = new List<User>();
        Profile p = [SELECT id FROM Profile WHERE name = 'Standard User' LIMIT 1];
        User brokenUser = new User(
            firstName = 'Test',
            lastName = 'Hero',
            email = 'test2@test.com',
            alias = 'testHero',
            username = 'testhero_@test.com',
            communityNickname = 'testHero1234',
            localeSidKey = 'en_US',
            timeZoneSidKey = 'GMT',
            profileId = p.id,
            languageLocaleKey = 'en_US',
            emailEncodingKey = 'UTF-8'
        );
        userList.add( brokenUser );

        UserTriggerHandler.AssignExams( userList );
        createdResults = [SELECT account__c FROM Exam_Result__c];
        System.assertEquals( 0, createdResults.size() );
    }

    @isTest
    private static void TB_AssignExams() {
        List<User> userList = new List<User>();
        Profile p = [SELECT id FROM Profile WHERE name = 'Standard User' LIMIT 1];
        User sfUser = new User(
            firstName = 'Salesforce',
            lastName = 'Hero',
            email = 'test2@test.com',
            alias = 'testHero',
            username = 'testhero_@test.com',
            communityNickname = 'testHero1234',
            localeSidKey = 'en_US',
            timeZoneSidKey = 'GMT',
            profileId = p.id,
            languageLocaleKey = 'en_US',
            emailEncodingKey = 'UTF-8'
        );
        User javaUser = new User(
            firstName = 'Java',
            lastName = 'Hero',
            email = 'testjava2@test.com',
            alias = 'testHeroJava',
            username = 'testherojava_@test.com',
            communityNickname = 'testHeroJava1234',
            localeSidKey = 'en_US',
            timeZoneSidKey = 'GMT',
            profileId = p.id,
            languageLocaleKey = 'en_US',
            emailEncodingKey = 'UTF-8'
        );
        List<Exam__c> sfExams = [SELECT id FROM Exam__c WHERE Titan__r.Curriculum__r.technology__c = 'Salesforce'];
        List<Exam__c> javaExams = [SELECT id FROM Exam__c WHERE Titan__r.Curriculum__r.technology__c = 'Java'];
        userList.add( sfUser );
        userList.add( javaUser );

        for ( Integer i = 0; i < 150; i++ ) {
            userList.add( new User(
                firstName = 'Broken',
                lastName = 'Hero ' + i,
                email = 'testjava2@test.com',
                alias = 'testHeroJava',
                username = 'testherojava_@test.com',
                communityNickname = 'testHeroJava1234',
                localeSidKey = 'en_US',
                timeZoneSidKey = 'GMT',
                profileId = p.id,
                languageLocaleKey = 'en_US',
                emailEncodingKey = 'UTF-8'
            ));
        }

        UserTriggerHandler.AssignExams( userList );
        List<Exam_Result__c> createdResults = [SELECT account__c FROM Exam_Result__c];

        System.assertEquals( sfExams.size() + javaExams.size(), createdResults.size() );
    }
}