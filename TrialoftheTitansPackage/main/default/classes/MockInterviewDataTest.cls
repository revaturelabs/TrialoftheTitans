@isTest
public with sharing class MockInterviewDataTest {


    

        @TestSetup
        public static void makeData(){

            Account acc = new Account(Name='ZZ');
            insert acc;
            Contact con = new Contact(FirstName='ZZ', Email='ZZ@bb.com');
           
            Mock_Interview_Self__c mock = new Mock_Interview_Self__c(Account__c= acc.Id,Public__c= true);

            insert mock;

            ContentVersion contentVersionInsert = new ContentVersion(
            Title = 'Test',
            PathOnClient = 'Test.jpg',
            VersionData = Blob.valueOf('Test Content Data'),
            IsMajorVersion = true
            );
            insert contentVersionInsert;
            
            
        }

        @isTest
        public static void createTest() {

            Test.startTest();

            Mock_Interview_Self__c mock = [SELECT Account__c, Id FROM Mock_Interview_Self__c LIMIT 1];
            Blob bodyBlob=Blob.valueOf('Unit Test ContentVersion Body to be insert in test class for testing the'); 
            
            ContentVersion contentVersion_1 = new ContentVersion(
                Title='SampleTitle', 
                PathOnClient ='SampleTitle.jpg',
                VersionData = bodyBlob, 
                origin = 'H'
            );
            insert contentVersion_1;
            
            ContentVersion contentVersion_2 = [SELECT Id, Title, ContentDocumentId 
                            FROM ContentVersion WHERE Id = :contentVersion_1.Id LIMIT 1];
            
            ContentDocumentLink contentlink = new ContentDocumentLink();
            contentlink.LinkedEntityId = mock.id;
            contentlink.contentdocumentid = contentVersion_2.contentdocumentid;
            contentlink.ShareType = 'V';
            insert contentlink;
        
            String url = MockInterviewData.getContentId(mock.Id);
            String url2='/sfc/servlet.shepherd/document/download/'+contentlink.ContentDocumentId;
            String getFileId = MockInterviewData.getFileId(mock.Id);
            String contentId = contentlink.ContentDocumentId;
            Test.stopTest();
            

            System.assertEquals(url2,url);
            System.assertEquals(contentId, getFileId);
        }

    

           
        

    
}
