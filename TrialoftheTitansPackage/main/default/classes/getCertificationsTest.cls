@isTest
public with sharing class getCertificationsTest {

    private static List<Certification__c> certs;
    private static List<Certification__c> certsBulk;
    private static List<Certification__c> insertCert = new List<Certification__c>();


    @TestSetup
    static void mockCertSetup(){
        Certification_Exam__c mock1 = new Certification_Exam__c();
        Contact mock2 = new Contact(firstName='Perseus', lastname='Eurymedon');

        insert mock1;
        insert mock2;
    }

    @isTest
    static void getRecord() {

        Certification__c c = new Certification__c();
        c.Certification_Exam__c = [SELECT Id FROM Certification_Exam__c LIMIT 1][0].Id;
        c.Candidate__c = [SELECT Id FROM Contact LIMIT 1][0].Id;
        //Inserts a certification into the database
        insert c;

        //Calls the method and returns the certifications to the certs variable
        certs = getCertifications.Certifications();
        //checks to see if the inserted cert is returned
        System.assert(certs.size()==1);
    }
    @isTest
    static void getRecordBulk(){

        //Creates a list of certifications to be added into the list
        String mockCertId = [SELECT Id FROM Certification_Exam__c LIMIT 1][0].Id;
        String mockCandId = [SELECT Id FROM Contact LIMIT 1][0].Id;
        for(Integer i = 0; i<10; i++)
        {
            insertCert.add(new Certification__c(
                Certification_Exam__c=mockCertId,
            Candidate__c=mockCandId));
        }
        Test.startTest();
        //inserts the list of certifications
        insert insertCert;
        //Returns all of the certifications in the database
        certsBulk = getCertifications.Certifications();
        Test.stopTest();

        System.assert(certsBulk.size()==10);
    }

    @isTest
    static void getRecordNegative(){

        //Returns all the certifications however there should not be any so an error is thrown and the result should be null
        try{
            certs = getCertifications.Certifications();
        } catch(Exception e){
            System.assert(certs==null);
        }
    }
}