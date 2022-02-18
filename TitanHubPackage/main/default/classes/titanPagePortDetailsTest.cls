
/*

    Author: Andrew Emond
    Description: Test for porfolio section on titan page(Incomplete 48%). No test yet for the final method. I have not set up experience yet, so I cannot
    Date Created: 1/25/21                                             connect a user to a contact.

*/

@istest
public class titanPagePortDetailsTest {

    @istest
    private static void getSkillsInfoSingleTest(){               //Single Test
         list<titan__c> tList =new list<titan__c>();
        for(integer i=0;i<1;i++){
            titan__c t= new titan__c();
            t.name='testTitan';
            t.Technology__c='Salesforce';
            tList.add(t);      
        }
        insert tList;  
        list<titan__c> testSoql=[SELECT Name From titan__c];
        list<skill__c> sList = new list<skill__c>();
            for(titan__c t: testSoql){
                skill__c s= new skill__c();
                s.name='testskill';
                s.Titan__c=t.id;
                s.Skill_Breakdown__c= 'test breakdown';
                s.Assigments__c= 'test assig';
                s.Skill_Type__c='Coding';
                sList.add(s);
        	 }
        insert sList;
        id tId = testSoql[0].id;
        titanPagePortDetailsHelper.getSkillsInfo(tId);
        list<skill__c> sSoql = [SELECT Assigments__c,Name,Titan__c, Skill_Breakdown__c,Skill_Type__c FROM Skill__c];
        system.assertEquals(1, sSoql.size());
    }
      @istest
    private static void getSkillsInfoBulkTest(){                    //Bulk Test
         list<titan__c> tList =new list<titan__c>();
        for(integer i=0;i<100;i++){
            titan__c t= new titan__c();
            t.name='testTitan';
            t.Technology__c='Salesforce';
            tList.add(t);      
        }
        insert tList;  
        list<titan__c> testSoql=[SELECT Name From titan__c];
        list<skill__c> sList = new list<skill__c>();
            for(titan__c t: testSoql){
                skill__c s= new skill__c();
                s.name='testskill';
                s.Titan__c=t.id;
                s.Skill_Breakdown__c= 'test breakdown';
                s.Assigments__c= 'test assig';
                s.Skill_Type__c='Coding';
                sList.add(s);
        	 }
        insert sList;
        id tId = testSoql[0].id;
        titanPagePortDetailsHelper.getSkillsInfo(tId);
        list<skill__c> sSoql = [SELECT Assigments__c,Name,Titan__c, Skill_Breakdown__c,Skill_Type__c FROM Skill__c];
        system.assertEquals(100, sSoql.size());
    }
    @isTest
    private static void getEquivSingleTest(){                         //Single Test
           list<titan__c> tList =new list<titan__c>();
        for(integer i=0;i<1;i++){
            titan__c t= new titan__c();
            t.name='testTitan';
            t.Technology__c='Salesforce';
            tList.add(t);      
        }
        insert tList;  
        list<titan__c> testSoql=[SELECT Name From titan__c];
        list<skill__c> sList = new list<skill__c>();
            for(titan__c t: testSoql){
                skill__c s= new skill__c();
                s.name='testskill';
                s.Titan__c=t.id;
                s.Skill_Breakdown__c= 'test breakdown';
                s.Assigments__c= 'test assig';
                s.Skill_Type__c='Coding';
                sList.add(s);
        	 }
        insert sList;
        id tId = testSoql[0].id;
        id userId = UserInfo.getUserId();
        list<Equivalency__c> eList = new list<Equivalency__c>();
        for(skill__c s: slist){
            Equivalency__c e = new Equivalency__c();
            e.Name='equivtest';
            e.User__c=userId;
            e.Skill__c=s.Id;
            eList.add(e);
        }
        insert eList;
        list<Equivalency__c> eSoql = [SELECT Skill__c,Name,Skill_Equivalency__c,Id,User__c FROM Equivalency__c];
        titanPagePortDetailsHelper.getEquiv(tId);
        system.assertEquals(1, eSoql.size());
    }
     @isTest
    private static void getEquivBulkTest(){                       //Bulk Test
           list<titan__c> tList =new list<titan__c>();
        for(integer i=0;i<100;i++){
            titan__c t= new titan__c();
            t.name='testTitan';
            t.Technology__c='Salesforce';
            tList.add(t);      
        }
        insert tList;  
        list<titan__c> testSoql=[SELECT Name From titan__c];
        list<skill__c> sList = new list<skill__c>();
            for(titan__c t: testSoql){
                skill__c s= new skill__c();
                s.name='testskill';
                s.Titan__c=t.id;
                s.Skill_Breakdown__c= 'test breakdown';
                s.Assigments__c= 'test assig';
                s.Skill_Type__c='Coding';
                sList.add(s);
        	 }
        insert sList;
        id tId = testSoql[0].id;
        id userId = UserInfo.getUserId();
        list<Equivalency__c> eList = new list<Equivalency__c>();
        for(skill__c s: slist){
            Equivalency__c e = new Equivalency__c();
            e.Name='equivtest';
            e.User__c=userId;
            e.Skill__c=s.Id;
            eList.add(e);
        }
        insert eList;
        list<Equivalency__c> eSoql = [SELECT Skill__c,Name,Skill_Equivalency__c,Id,User__c FROM Equivalency__c];
        titanPagePortDetailsHelper.getEquiv(tId);
        system.assertEquals(100, eSoql.size());
    }
    @istest
    public static void getProjectInfoSingleTest(){                  //Single Test
        list<project__c> pList= new list<project__c>();
        for(integer i=0;i<1;i++){
            project__c p = new project__c();
            p.Name='test project';
            p.User__c=UserInfo.getUserId();
            pList.add(p);
        }
        insert pList;
        list<project__c> pSOQL = [SELECT User__c,Name,Id From Project__c];
        titanPagePortDetailsHelper.getProjectInfo();
        system.assertEquals(1, pSOQL.size());
    }
    @istest
    public static void getProjectInfoBulkTest(){                    //Bulk Test
        list<project__c> pList= new list<project__c>();
        for(integer i=0;i<100;i++){
            project__c p = new project__c();
            p.Name='test project';
            p.User__c=UserInfo.getUserId();
            pList.add(p);
        }
        insert pList;
        list<project__c> pSOQL = [SELECT User__c,Name,Id From Project__c];
        titanPagePortDetailsHelper.getProjectInfo();
        system.assertEquals(100, pSOQL.size());
    }                                                              //One method has not been tested yet.
        
}
