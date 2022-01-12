@isTest
private class QCQuestionEditController_Test {
    
    
    @testSetup static void setup() {
        
        Profile p = [Select Id from Profile where name = 'System Administrator'];
        User u2 = new User(Alias = 'newU100', Email='newuser100@testorg.com',
                           EmailEncodingKey='UTF-8', LastName='Testing100', LanguageLocaleKey='en_US',
                           LocaleSidKey='en_US', ProfileId = p.Id,
                           TimeZoneSidKey='America/Los_Angeles', UserName='newuser100@testorg.com');
        
        System.runAs(u2) {
            
            QC_Question_Deck__c testQuestionDeck = new QC_Question_Deck__c(Name='TestDeck');
            insert testQuestionDeck;
            
            
            List<QC_Question__c> testQCQuestionList = new List<QC_Question__c>();
            
            for(Integer i=0;i<=100;i++) {
                testQCQuestionList.add(new QC_Question__c( 
                    
                    Name='Test'+i,
                    Expected_Answer__c= 'AnswerTest'+i,
                    Question_Body__c = 'QuestionBodyTest'+i,
                    QC_Question_Deck__c= testQuestionDeck.Id
                ));
            }
            insert  testQCQuestionList;    
        }
    }
    
    @isTest static void accessWithoutPermissionToMethod() { 
        
        
        
        Boolean exceptionOccurred = false;
        
        
        QC_Question__c retrieveQC = [SELECT ID,Name,QC_Question_Deck__r.Name,Expected_Answer__c,Question_Body__c  FROM QC_Question__c WHERE Name='Test0' LIMIT 1];
        
        try{
            
            List<QC_Question__c> retrieveQCquestionList=  QCQuestionEditController.getQCQuestion(retrieveQC.Id,100,100);
            
        }
        catch (Exception e){
            
            exceptionOccurred = true;
        }
        System.assert(exceptionOccurred, 'An Exception was not thrown');  
        
        
    }
    
    @isTest static void updateQCQuestionList() { 
        System.Test.startTest();  
        
        List<QC_Question__c> qcList = [SELECT ID,Name,QC_Question_Deck__r.Name,QC_Question_Deck__c,Expected_Answer__c,Question_Body__c  FROM QC_Question__c WHERE Name LIKE 'Test%' LIMIT 100];
        List<QC_Question__c>  updateQCQList  = new List<QC_Question__c> ();
        QC_Question_Deck__c testQuestionDeck = new QC_Question_Deck__c(Name='TestDeck2');
        
        insert testQuestionDeck;
        
        for(QC_Question__c qc :  qcList){
            
            qc.QC_Question_Deck__c  = testQuestionDeck.Id;
            updateQCQList.add(qc);
            
            
            
        }
        Database.SaveResult[] saveResults = Database.update(updateQCQList , false);
        
        Integer counter = 0;
        for(Database.SaveResult sr : saveResults) {
            if(sr.isSuccess()) { 
                
                ++counter;
                
            }}
        System.assertEquals(100, counter);
        
        System.Test.stopTest();
    }
    
    @isTest static void updateQCQuestionListApexControllerMethod() { 
        System.Test.startTest();  
        
        QC_Question__c qcRec = [SELECT ID,Name,QC_Question_Deck__r.Name,QC_Question_Deck__c,Expected_Answer__c,Question_Body__c  FROM QC_Question__c WHERE Name LIKE 'Test%' LIMIT 1];
        QC_Question_Deck__c testQuestionDeck = new QC_Question_Deck__c(Name='TestDeck2');
        
        insert testQuestionDeck;
        
        for(Integer i=0;i<=1;i++){
            
            qcRec.QC_Question_Deck__c  = testQuestionDeck.Id;
            
        }
        
        QCQuestionEditController.updateQCQuestion(qcRec);
        
        List<QC_Question__c> retrieveQCList = [SELECT ID,Name,QC_Question_Deck__r.Name,QC_Question_Deck__c,Expected_Answer__c,Question_Body__c  FROM QC_Question__c   LIMIT 1];
        Integer counter = 0;
        for(QC_Question__c qc : retrieveQCList) {
            if(testQuestionDeck.Id == qc.QC_Question_Deck__c) { 
                
                ++counter;
                
            }}
        System.assertEquals(1, counter);
        
        System.Test.stopTest();
    }
    
    @isTest static void deleteSingleQCQuestion() {
        System.Test.startTest();  
        
        QC_Question__c newQuestion   = new QC_Question__c( 
            
            Name='newTest',
            Expected_Answer__c= 'newAnswerTest',
            Question_Body__c = 'newQuestionBodyTest'
            
        );
        insert newQuestion;
        System.Test.stopTest();
        
        QCQuestionEditController.deleteQCQuestion(newQuestion);
        
        List<QC_Question__c> qcList = [SELECT ID,Name,QC_Question_Deck__r.Name,QC_Question_Deck__c,Expected_Answer__c,Question_Body__c  FROM QC_Question__c WHERE Name ='newTest'];
        
        
        
        System.assertEquals(0,qcList.size()  );
        
        
        
        
    }
    
    @isTest static void deleteListOfQCQuestion() {
        
        
        
        
        List<QC_Question__c> testQCQuestionList = new List<QC_Question__c>();         
        for(Integer i=100;i<=200;i++) {
            testQCQuestionList.add(new QC_Question__c( 
                
                Name='TypeofT'+i,
                Expected_Answer__c= 'AnswerTest'+i,
                Question_Body__c = 'QuestionBodyTest'+i
                
            ));
        }
        
        System.Test.startTest();  
        
        insert  testQCQuestionList;
        
        QCQuestionEditController.deleteQCQuestionRows(testQCQuestionList);
        
        System.Test.stopTest();
        
        List<QC_Question__c> qcList = [SELECT ID,Name,QC_Question_Deck__r.Name,QC_Question_Deck__c,Expected_Answer__c,Question_Body__c  FROM QC_Question__c WHERE Name LIKE 'TypeofT%' LIMIT 100];
        
        System.assertEquals(0,qcList.size()  );
        
        
        
        
    }
    
}