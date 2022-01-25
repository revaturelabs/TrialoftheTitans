///////////////////////////////////////////////////////////////////////////////// 
// 
// Name: TitanHubCertDetailsController
// Author: Alan Huang
// Created: 01/25/2022
// Updated: 01/25/2022
// Description: Apex Controller for titanHubCertDetails LWC component
// 
/////////////////////////////////////////////////////////////////////////////////
//
public with sharing class TitanHubCertDetailsController {
    
    @AuraEnabled(cacheable=true)
    public static List<Certification_Exam__c> getCertDetails(Id titanId) {
        List<Titan_Topic__c> titanTopics = [SELECT Exam_Topic__r.Certification_Exam__c
                                            FROM Titan_Topic__c WHERE Titan__c=:titanId];
        List<Id> certExamIds = new List<Id>();
        List<Id> examTopicIds = new List<Id>();
        for (Titan_Topic__c titanTopic : titanTopics) {
            certExamIds.add(titanTopic.Exam_Topic__r.Certification_Exam__c);
            examTopicIds.add(titantopic.Exam_Topic__c);
        }
        
        List<Certification_Exam__c> certExams = [SELECT Name,
                                                 (SELECT Name, Weight__c FROM Exam_Topics__r WHERE Id=:examTopicIds)
                                                 FROM Certification_Exam__c WHERE Id=:certExamIds];
        return certExams;
    }
    
}