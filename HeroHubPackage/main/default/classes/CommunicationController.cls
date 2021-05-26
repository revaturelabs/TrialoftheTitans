/*
    CREATED BY: Jared Longnecker
    USAGE: This class is used to interface with the server in order to retrieve chatter posts and create new chatter
    posts.
*/

public with sharing class CommunicationController {

    public CommunicationController() {

    }


    // DESCRIPTION: Used to get all the chatter groups the context user is a part of
    @AuraEnabled
    public static List<CollaborationGroup> GetGroups() {

        // Query for member group list of the context user
        User currentUser = [ SELECT id, name FROM User WHERE Name LIKE '%User%' LIMIT 1 ];
        List<CollaborationGroupMember> groupMemberList = [  SELECT id, collaborationGroupId 
                                                            FROM CollaborationGroupMember 
                                                            WHERE memberId = :currentUser.id ];

        // Create an ID set to query for just the groups themselves
        Set<Id> groupIds = new Set<Id>();
        for ( CollaborationGroupMember aGroup : groupMemberList ) {
            groupIds.add( aGroup.collaborationGroupId );
        }

        // Return those groups that the context user is a member of
        return [    SELECT id, name 
                    FROM CollaborationGroup
                    WHERE id IN :groupIds ];
    }

    // DESCRIPTION: Used to get all chatter messages from an input chatter group
    // PARAMETERS:  - groupId : the id of the chatter group to pull messages from
    @AuraEnabled
    public static List<ConnectAPI.FeedElement> GetGroupContent( String groupId ) {
        if ( groupId == '' ) {
            return new List<ConnectAPI.FeedElement>();
        }

        // Retrieve a chatter group feed based off input group ID
        ConnectAPI.FeedElementPage groupFeed = 
            ConnectAPI.ChatterFeeds.getFeedElementsFromFeed( null, ConnectAPI.feedType.RECORD, groupId );

        // Return the list of FeedElements from the group
        return groupFeed.elements;
    }

    // DESCRIPTION: Used to post a input message to an input chatter group and return the created element
    // PARAMATERS:  - groupId : the id of the chatter group to post the message to
    //              - message : the text to be posted to the group
    @AuraEnabled
    public static ConnectAPI.FeedElement PostMessageToGroup( String groupId, String message ) {
        if ( groupId == '' ) 
            return null;
            
        ConnectAPI.FeedItemInput feedInput = new ConnectAPI.FeedItemInput();
        ConnectAPI.MentionSegmentInput mentionInput = new ConnectAPI.MentionSegmentInput();
        ConnectAPI.MessageBodyInput messageInput = new ConnectAPI.MessageBodyInput();
        ConnectAPI.TextSegmentInput textInput = new ConnectAPI.TextSegmentInput();
        
        // Used to store the segments of the message (the mention and the text)
        messageInput.messageSegments = new List<ConnectAPI.MessageSegmentInput>();

        // FOR FUTURE USE:
        // If you need to include mentions, find the id's of the users mentioned and add a mention segment
        // for each user, then add those mention segments to messageInput.messageSegments

        // Populate the body of the message
        textInput.text = message;
        messageInput.messageSegments.add(textInput);

        // Attach the input to the feed item and populate type and id fields
        feedInput.body = messageInput;
        feedInput.feedElementType = ConnectAPI.FeedElementType.FEEDITEM;
        feedInput.subjectId = groupId;

        ConnectAPI.FeedElement feedElement = null;
        // Post element
        try {
            feedElement = ConnectAPI.ChatterFeeds.postFeedElement( null, feedInput );
        }
        catch (Exception e) {
            throw new AuraHandledException( e.getMessage() );
        }
        return feedElement;
    }
}
