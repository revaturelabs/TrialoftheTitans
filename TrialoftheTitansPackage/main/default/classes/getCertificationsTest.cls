@isTest
public with sharing class getCertificationsTest {

    private static List<Certification__c> certs;
    private static List<Certification__c> certsBulk;
    private static List<Certification__c> insertCert = new List<Certification__c>();

    @isTest
    static void getRecord() {

        Certification__c c = new Certification__c();
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
        for(Integer i = 0; i<200; i++)
        {
            insertCert.add(new Certification__c());
        }
        Test.startTest();
        //inserts the list of certifications
        insert insertCert;
        //Returns all of the certifications in the database
        certsBulk = getCertifications.Certifications();
        Test.stopTest();

        System.assert(certsBulk.size()==200);
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