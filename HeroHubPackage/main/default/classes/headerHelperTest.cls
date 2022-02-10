/*

    Author: Andrew Emond
    Description: Test for header component (Incomplete 68% when uncommented out)
    Date Created: 1/25/21

*/

@isTest
public class headerHelperTest {                  //single test
	@isTest
    private static void getTeamInfoS(){
        headerHelper.getTeamInfo();
        list<Team__c> tList = new list<Team__c>();
        for(integer i = 0; i<1;i++){
            Team__c team = new Team__c();
            team.name= 'Amplifire';
            team.Primary_Color__c = '#FF0000';
            team.Secondary_Color__c= '#FFFFFF';
           	team.Slogan__c= 'wow';
            team.In_Lead__c= true;  
            tList.add(team);
        }
        insert tList;
        List<Team__c> testList = [Select id,Name from Team__c];
        system.assertEquals(1, testList.size());
    }
    @isTest
    private static void getTeamInfoB(){             //bulk test
        headerHelper.getTeamInfo();
        list<Team__c> tList = new list<Team__c>();
        for(integer i = 0; i<100;i++){
            Team__c team = new Team__c();
            team.name= 'Amplifire';
            team.Primary_Color__c = '#FF0000';
            team.Secondary_Color__c= '#FFFFFF';
           	team.Slogan__c= 'wow';
            team.In_Lead__c= true;  
            tList.add(team);
        }
        insert tList;
        List<Team__c> testList = [Select id,Name from Team__c];
        system.assertEquals(100, testList.size());
}/*
   @isTest
    private static void getTechInfo(){                     //I have not been able to test this class. I believe that you can only link a user to a contact
        headerHelper.getTechInfo();                        // when the user was created through experience cloud. Which I do not currently have up
        list<User> uList = new list<User>();
        for(integer i = 0; i<1;i++){
            User u = new user();
			u.LastName = 'Test Code';
			u.Email = 'test@test.com';
			u.Alias = 'Tcode';
			u.Username = 'test1234444@test.com';
			u.CommunityNickname = 'test12';
			u.LocaleSidKey = 'en_US';
			u.TimeZoneSidKey = 'GMT';
			u.ProfileID = '00e90000000oyi5';
			u.LanguageLocaleKey = 'en_US';
			u.EmailEncodingKey = 'UTF-8';
            u.ContactId = '00e90000000oyi5';
            ulist.add(u);
    }
        list<curriculum__c> cList= new list<curriculum__c>();
        for(integer i=0;i<1;i++){
            curriculum__c c = new curriculum__c();
            c.Name= 'test curr';
            c.Technology__c='Salesforce';
            cList.add(c);
        }
        insert cList;
        list<curriculum__c> cSOQL= [SELECT name,Technology__c,Id FROM Curriculum__c];
        system.assertEquals(1,cSOQL.size());
}*/
}
