/*
    CREATED BY: Jared Longnecker
    USAGE: Handles trigger logic for the User object
*/

public class UserTriggerHandler {
    
    // DESCRIPTION: Assigns relevant exams to a user upon creation of the user
    // PARAMETERS:  - userList : a list of newly created users to add exam results for
    
    public static void AssignExams( List<User> userList ) {
        if ( userList == null || userList.size() == 0 )
            return;

        // Retrieve the data we need: Relevant Exams and User Accounts
        Map<User, List<Exam__c> > examsMap = GetUserToExamMap( userList );
        Map<User, Account> accountMap = GetUserToAccountMap( userList );
        List<Exam_Result__c> createdResults = new List<Exam_Result__c>();

        for ( User u : userList ) {

            // If the user does not have an account, skip them
            if ( accountMap.get( u ) == null )
                continue;

            // Retrieve the relevant exams for the user
            List<Exam__c> workingExamList = examsMap.get( u );

            // For each exam, create an exam result assigned to the account of the user
            for ( Exam__c currExam : workingExamList ) {
                Exam_Result__c newResult = new Exam_Result__c(
                    Exam__c = currExam.id,
                    Account__c = accountMap.get( u ).id,
                    Graded__c = false,
                    Status__c = 'Assigned'
                );
                createdResults.add( newResult );
            }
        }
        Insert createdResults;
    }

    // DESCRIPTION: Maps users to relevant exams for their curriculum
    // PARAMETERS:  - userList : the list of users to map
    @testVisible
    private static Map< User, List<Exam__c> > GetUserToExamMap( List<User> userList ) {
        Map<User, Curriculum__c> curriculumMap = GetUserToCurriculumMap( userList );

        // Create a set of curriculums to filter exam results for
        Set<id> curriculumSet = new Set<id>();
        for ( User u : userList ) {

            // Users not assigned to a curriculum should be skipped
            if ( curriculumMap.get( u ) == null )
                continue;
            curriculumSet.add( curriculumMap.get( u ).id );
        }

        // Retrieve all exams related to all users' curricula
        List<Exam__c> possibleExams = [SELECT id, Titan__r.Curriculum__c FROM Exam__c WHERE Titan__r.Curriculum__c IN :curriculumSet];

        // Map users to their relevant exam list
        Map< User, List<Exam__c> > examsMap = new Map< User, List<Exam__c> >();
        for ( User u : userList ) {
            examsMap.put( u, GetRelevantExams( curriculumMap.get( u ), possibleExams ) );
        }
        return examsMap;
    }

    // DESCRIPTION: Maps users to their assigned curriculum
    // PARAMETERS:  - userList : the list of users to map
    @testVisible
    private static Map<User, Curriculum__c> GetUserToCurriculumMap( List<User> userList ) {
        Map<User, Account> accountMap = GetUserToAccountMap( userList );

        // Create a set of curricula ids to filter curricula results
        Set<id> curriculumSet = new Set<id>();
        for ( User u : userList ) {

            // If a user does not have an account, skip that user
            if ( accountMap.get( u ) == null )
                continue;
            curriculumSet.add( accountMap.get( u ).curriculum__c );
        }

        // Retrieve the curricula associated with all the accounts
        List<Curriculum__c> possibleCurrics = [SELECT id FROM Curriculum__c WHERE id IN :curriculumSet];

        // Map the users to their curriculum
        Map<User, Curriculum__c> curricMap = new Map<User, Curriculum__c>();
        for ( User u : userList ) {

            // If the user has no account, do not map them
            if ( accountMap.get( u ) == null )
                continue;

            for ( Curriculum__c curric : possibleCurrics ) {
                if ( accountMap.get( u ).curriculum__c == curric.id ) {
                    curricMap.put( u, curric );
                    break;
                }
            }
        }

        return curricMap;
    }

    // DESCRIPTION: Maps users to their Hero Accounts
    // PARAMETERS:  - userList : the list of users to map
    @testVisible
    private static Map<User, Account> GetUserToAccountMap( List<User> userList ) {

        // Create a set of usernames to filter out accounts
        Set<String> usernameSet = new Set<String>();
        for ( User u : userList ) {
            String username = u.name;

            // For testing, user.name = null until insert
            if ( username == null )
                username = u.firstName + ' ' + u.lastName;
            usernameSet.add( username );
        }

        // Retrieve all accounts linked to our users
        List<Account> possibleAccounts = [SELECT name, curriculum__c FROM Account WHERE name IN :usernameSet];

        // Map users to their hero accounts
        Map<User, Account> accountMap = new Map<User, Account>();
        for ( User u : userList ) {
            String username = u.name;

            // For testing, user.name = null until insert
            if ( username == null )
                username = u.firstName + ' ' + u.lastName;

            for ( Account acc : possibleAccounts ) {
                if ( acc.name == username ) {
                    accountMap.put( u, acc );
                    break;
                }
            }
        }

        return accountMap;
    }

    // DESCRIPTION: Retrieves only the exams related to the curriculum given
    // PARAMETERS:  - curriculum : the curriculum to match exams to
    //              - possibleExams : the list of exams to filter
    @testVisible
    private static List<Exam__c> GetRelevantExams( Curriculum__c curriculum, List<Exam__c> possibleExams ) {
        List<Exam__c> relevantExamList = new List<Exam__c>();

        // If either the curriculum or the exam list are null, return an empty list
        if ( curriculum == null || possibleExams == null )
            return relevantExamList;

        // Match exam curriculum to our filter curriculum
        for ( Exam__c exam : possibleExams ) {
            if ( exam.Titan__r.Curriculum__c == curriculum.id )
                relevantExamList.add( exam );
        }

        return relevantExamList;
    }
}