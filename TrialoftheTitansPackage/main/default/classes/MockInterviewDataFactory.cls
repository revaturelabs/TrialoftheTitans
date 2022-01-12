/////////////////////////////////////////////////////////////////////////////
//
//	Name: MockInterviewHubDataFactory
//	Author: Camron Miller
//	Description: Creates data for testing functionality related to the
//				 Mock interview Package.
//
/////////////////////////////////////////////////////////////////////////////

public class MockInterviewDataFactory 
{
    public static void dataFactory()
    {
        // create 10 new accounts and add them to the org
        // only filling in the required fields
        List<Account> testAccounts = new List<Account>();
        for(integer i = 0; i < 10; i++)
        {
            testAccounts.add(new Account(Name = 'Test Account #' + (i + 1)));
        }
        insert testAccounts; 

        // create 5 mock interview self records for each account, 50 total
        // only filling in the required fields
        List<Mock_Interview_Self__c> testMockInterviews = new List<Mock_Interview_Self__c>();
        for(Account a : testAccounts)
        {
            for(integer i = 0; i < 5; i++)
            {
                testMockInterviews.add(new Mock_Interview_Self__c(Account__c = a.Id));
            }
        }
        insert testMockInterviews;

        // create 2 feedback records for each mock interview self
        // only filling in the required fields
        List<Feedback__c> testFeedbacks = new List<Feedback__c>();
        for(Mock_Interview_Self__c m : testMockInterviews)
        {
            for(integer i = 0; i < 2; i++)
            {
                testFeedbacks.add(new Feedback__c(Mock_Interview_Self__c = m.Id, Fluence__c = i));
            }
        }
        insert testFeedbacks;

        // create 10 mock interview pools
        // only filling in the required fields
        List<MI_Question_Pool__c> testMIQuestionPools = new List<MI_Question_Pool__c>();
        for(integer i = 0; i < 10; i++)
        {
            testMIQuestionPools.add(new MI_Question_Pool__c());
        }
        insert testMIQuestionPools; 
    }
}