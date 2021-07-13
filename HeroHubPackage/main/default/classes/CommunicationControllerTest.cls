@isTest
public class CommunicationControllerTest {
    
    @TestSetup
    private static void SetupCommunicationTests() {

        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User'];

        User testUser = new User();
        testUser.LastName = 'Nonmember';
        testUser.Email = 'test2@test.com';
        testUser.Alias = 'Tcoder';
        testUser.Username = 'test123444443212@test.com';
        testUser.CommunityNickname = 'test1234';
        testUser.LocaleSidKey = 'en_US';
        testUser.TimeZoneSidKey = 'GMT';
        testUser.ProfileID = p.id;
        testUser.LanguageLocaleKey = 'en_US';
        testUser.EmailEncodingKey = 'UTF-8';

        Insert testUser;

        testUser = new User();
        testUser.LastName = 'Code Tester';
        testUser.Email = 'test@test.com';
        testUser.Alias = 'Tcode';
        testUser.Username = 'test12344444321@test.com';
        testUser.CommunityNickname = 'test12';
        testUser.LocaleSidKey = 'en_US';
        testUser.TimeZoneSidKey = 'GMT';
        testUser.ProfileID = p.id;
        testUser.LanguageLocaleKey = 'en_US';
        testUser.EmailEncodingKey = 'UTF-8';

        Insert testUser;

        CollaborationGroup testGroup = new CollaborationGroup();
        testGroup.name = 'Example Group 1';
        testGroup.collaborationType = 'Public';

        Insert testGroup;

        CollaborationGroupMember groupMember = new CollaborationGroupMember();
        groupMember.memberId = testUser.id;
        groupMember.CollaborationGroupId = testGroup.id;

        Insert groupMember;
        
    }

    @isTest
    private static void TP_GetGroups() {
        User runningUser = [SELECT id FROM User WHERE LastName = 'Code Tester' LIMIT 1];
        List<CollaborationGroup> userGroups;
        System.runAs( runningUser ) {
            userGroups = CommunicationController.GetGroups();
        }
        
        List<CollaborationGroup> allGroups = [SELECT name FROM CollaborationGroup];
        for ( Integer i = 0; i < userGroups.size(); i++ ) {
            System.assertEquals( allGroups.get( i ), userGroups.get( i ) );
        }

        runningUser = [SELECT id FROM User WHERE LastName = 'Nonmember' LIMIT 1];
        System.runAs( runningUser ) {
            userGroups = CommunicationController.GetGroups();
        }

        System.assertEquals( 0, userGroups.size() );
    }

    @isTest
    private static void TP_GetContextUserId() {
        User runningUser = [SELECT id FROM User WHERE LastName = 'Code Tester' LIMIT 1];
        System.runAs( runningUser ) {
            System.assertEquals( runningUser.id, CommunicationController.GetContextUserId() );
        }

        runningUser = [SELECT id FROM User WHERE LastName = 'Nonmember' LIMIT 1];
        System.runAs( runningUser ) {
            System.assertEquals( runningUser.id, CommunicationController.GetContextUserId() );
        }
    }

    @isTest
    private static void TP_GetGroupContent() {
        id groupId = [SELECT id FROM CollaborationGroup LIMIT 1].id;

        ConnectAPI.FeedElementPage testPage = new ConnectAPI.FeedElementPage();
        testPage.elements = new List<ConnectAPI.FeedItem>();
        testPage.elements.add( new ConnectAPI.FeedItem() );
        testPage.elements.add( new ConnectAPI.FeedItem() );

        ConnectAPI.ChatterFeeds.setTestGetFeedElementsFromFeed( null, ConnectAPI.feedType.RECORD, groupId, testPage );
        List<ConnectAPI.FeedElement> results = CommunicationController.GetGroupContent( groupId );

        System.assertEquals( 2, results.size() );
    }

    @isTest
    private static void TN_GetGroupContent() {
        List<ConnectAPI.FeedElement> results = CommunicationController.GetGroupContent( '' );

        System.assertEquals( 0, results.size() );
    }

    @isTest
    private static void TP_PostMessageToGroup() {
        id groupId = [SELECT id FROM CollaborationGroup LIMIT 1].id;

        string message = 'This is a test message!';

        ConnectAPI.FeedElement result = CommunicationController.PostMessageToGroup( groupId, message );
        System.assertEquals( message, result.body.text );
    }

    @isTest
    private static void TN_PostMessageToGroup() {
        ConnectAPI.FeedElement result = CommunicationController.PostMessageToGroup( '', 'Doesnt matter' );

        System.assertEquals( null, result );
    }
    
}