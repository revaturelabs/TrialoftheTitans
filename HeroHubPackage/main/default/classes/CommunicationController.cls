public with sharing class CommunicationController {

    public CommunicationController() {

    }

    public static List<String> GetFeedTabNames() {

        User currentUser = [ SELECT id, name FROM User WHERE Name LIKE '%User%' LIMIT 1 ];
        List<CollaborationGroupMember> groupMemberList = [  SELECT id, CollaborationGroup.name, collaborationGroupId 
                                                            FROM CollaborationGroupMember 
                                                            WHERE memberId = :currentUser.id ];

        List<String> groupNames = new List<String>();
        for ( CollaborationGroupMember aGroup : groupMemberList ) {
            groupNames.add( aGroup.CollaborationGroup.name );
        }
        return groupNames;
    }
}
