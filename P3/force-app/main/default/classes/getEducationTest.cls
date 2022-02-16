@isTest
public with sharing class getEducationTest {

    private static List<Education__c> education;
    private static List<Education__c> educationBulk;
    private static List<Education__c> insertEducation = new List<Education__c>();

    @isTest
    static void getRecord() {

        Education__c edu = new Education__c(Name='testSchool');
        //Inserts the school information into the database
        insert edu;

        //Calls the method and returns the school information to the education variable
        education = getEducation.getSchools();
        //checks to see if the inserted edu is returned
        System.assert(education.size()==1);
    }
    @isTest
    static void getRecordBulk(){

        //Creates a list of school information to be added into the list
        for(Integer i = 0; i<200; i++)
        {
            insertEducation.add(new Education__c(Name='testSchool'));
        }
        Test.startTest();
        //inserts the list of school information
        insert insertEducation;
        //Returns all of the school information in the database
        educationBulk = getEducation.getSchools();
        Test.stopTest();

        System.assert(educationBulk.size()==200);
    }

    @isTest
    static void getRecordNegative(){

        //Returns all the school information however there should not be any so an error is thrown and the result should be null
        try{
            education = getEducation.getSchools();
        } catch(Exception e){
            System.assert(education==null);
        }
    }
}