public class UserTriggerHandler {
    
    // Need to get the current curriculum to find the technology and filter exams by titans within the technology
    // Then you need to create an exam result for each of those exams

    public static void AssignExams( List<User> userList ) {

        Map<User, List<Exam__c> > examsMap = GetUserToExamMap( userList );
        Map<User, Account> accountMap = GetUserToAccountMap( userList );
        List<Exam_Result__c> createdResults = new List<Exam_Result__c>();

        for ( User u : userList ) {
            List<Exam__c> workingExamList = examsMap.get( u );

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

    private static Map< User, List<Exam__c> > GetUserToExamMap( List<User> userList ) {
        Map<User, Curriculum__c> curriculumMap = GetUserToCurriculumMap( userList );
        Set<id> curriculumSet = new Set<id>();
        for ( User u : userList ) {
            curriculumSet.add( curriculumMap.get( u ).id );
        }

        List<Exam__c> possibleExams = [SELECT id, Titan__r.Curriculum__c FROM Exam__c WHERE Titan__r.Curriculum__c IN :curriculumSet];

        Map< User, List<Exam__c> > examsMap = new Map< User, List<Exam__c> >();
        for ( User u : userList ) {
            examsMap.put( u, GetRelevantExams( curriculumMap.get( u ), possibleExams ) );
        }
        return examsMap;
    }

    private static Map<User, Curriculum__c> GetUserToCurriculumMap( List<User> userList ) {
        Map<User, Account> accountMap = GetUserToAccountMap( userList );
        Set<id> curriculumSet = new Set<id>();
        for ( User u : userList ) {
            curriculumSet.add( accountMap.get( u ).curriculum__c );
        }

        List<Curriculum__c> possibleCurrics = [SELECT id FROM Curriculum__c WHERE id IN :curriculumSet];
        Map<User, Curriculum__c> curricMap = new Map<User, Curriculum__c>();

        for ( User u : userList ) {
            for ( Curriculum__c curric : possibleCurrics ) {
                if ( accountMap.get( u ).curriculum__c == curric.id ) {
                    curricMap.put( u, curric );
                    break;
                }
            }
        }

        return curricMap;
    }

    private static Map<User, Account> GetUserToAccountMap( List<User> userList ) {
        Set<String> usernameSet = new Set<String>();
        for ( User u : userList ) {
            usernameSet.add( u.name );
        }

        List<Account> possibleAccounts = [SELECT name, curriculum__c FROM Account WHERE name IN :usernameSet];
        Map<User, Account> accountMap = new Map<User, Account>();

        for ( User u : userList ) {
            for ( Account acc : possibleAccounts ) {
                if ( acc.name == u.name ) {
                    accountMap.put( u, acc );
                    break;
                }
            }
        }

        return accountMap;
    }

    private static List<Exam__c> GetRelevantExams( Curriculum__c curriculum, List<Exam__c> possibleExams ) {
        List<Exam__c> relevantExamList = new List<Exam__c>();
        for ( Exam__c exam : possibleExams ) {
            if ( exam.Titan__r.Curriculum__c == curriculum.id )
                relevantExamList.add( exam );
        }

        return relevantExamList;
    }
}
