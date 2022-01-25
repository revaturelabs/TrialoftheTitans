///////////////////////////////////////////////////////////////////////////////// 
// 
// Name: TitanHubCertDetailsControllerTest
// Author: Alan Huang
// Created: 01/25/2022
// Updated: 01/25/2022
// Description: Test Class for Apex TitanHubCertDetailsController
// 
/////////////////////////////////////////////////////////////////////////////////

@isTest
class TitanHubCertDetailsControllerTest {
    
    @isTest
    static void getCertDetailsTest() {
        Titan__c titan = [SELECT Id FROM Titan__c];
        List<Certification_Exam__c> certExams = titanHubCertDetailsController.getCertDetails(titan.Id);
        
        List<Titan_Topic__c> titanTopics = [SELECT Exam_Topic__r.Certification_Exam__c
                                            FROM Titan_Topic__c WHERE Titan__c=:titan.Id];
        List<Id> certExamIds = new List<Id>();
        List<Id> examTopicIds = new List<Id>();
        for (Titan_Topic__c titanTopic : titanTopics) {
            certExamIds.add(titanTopic.Exam_Topic__r.Certification_Exam__c);
            examTopicIds.add(titantopic.Exam_Topic__c);
        }
        List<Certification_Exam__c> soqlCertExams = [SELECT Name,
                                                     (SELECT Name, Weight__c FROM Exam_Topics__r WHERE Id=:examTopicIds)
                                                     FROM Certification_Exam__c WHERE Id=:certExamIds];
        
        System.assertEquals(certExams, soqlCertExams);
    }
    
    @testSetup
    public static void testSetup() {
        List<Titan__c> titans = new List<Titan__c>{
            new Titan__c(Name='00 - Declarative - Titan 0', Technology__c='Salesforce')
        };
        insert titans;
        
        List<Certification_Exam__c> certExams = new List<Certification_Exam__c>{
        	new Certification_Exam__c(Name='Certification Exam 0')
        };
		insert certExams;
            
		List<Exam_Topic__c> examTopics = new List<Exam_Topic__c>{
            new Exam_Topic__c(Name='Exam Topic 0', Certification_Exam__c=certExams[0].Id, Weight__c=30)
        };
        insert examTopics;
        
        List<Titan_Topic__c> titanTopic = new List<Titan_Topic__c>{
            new Titan_Topic__c(Titan__c=titans[0].Id, Exam_Topic__c=examTopics[0].Id)
        };
		insert titanTopic;
    }
}