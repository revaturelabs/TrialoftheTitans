
/*
Created by: Andrew Emond
Description: Apex class for Portfolio Details LWC (titanPagePortDetails)
Date: 1/25/2022
*/

public with sharing class titanPagePortDetailsHelper {              
   @AuraEnabled(cacheable=true)
   public static List<Skill__c> getSkillsInfo(id titanId){         //Pulls information on Skill from a titan. Just returns one at the moment.
    list<Skill__c> sList = [SELECT Assigments__c,Name,Titan__c, Skill_Breakdown__c,Skill_Type__c FROM Skill__c WHERE Titan__c=: titanId LIMIT 1];
    return sList;
   }
   @AuraEnabled(cacheable=true)
   public static List<Equivalency__c> getEquiv(id titanId){        //Returns a users self inputed Equivalency on a skill.
      list<Skill__c> sList = [SELECT Assigments__c,Name,Titan__c, Skill_Breakdown__c,Skill_Type__c,Id FROM Skill__c WHERE Titan__c=: titanId LIMIT 1];
      id titanSkill = sList[0].Id;
      id userId = UserInfo.getUserId();
      list<Equivalency__c> eList = [SELECT Skill__c,Name,Skill_Equivalency__c,Id,User__c FROM Equivalency__c WHERE Skill__c=: titanSkill AND User__c =: userId];
      return eList;
   }
   @AuraEnabled(cacheable=true)
   public static list<Exam_Result__c> getExamInfo(id titanId){      //Returns a users exam results (how many they have passed). For creating the automatic equivalency.
      id userId = UserInfo.getUserId();
      User conObj = [SELECT name,ContactId,Id FROM User WHERE Id=: userId LIMIT 1];
      id conId = conObj.ContactId;
      Contact accObj = [SELECT name,AccountId,Id FROM Contact WHERE Id=: conId LIMIT 1];
      id accId = accObj.AccountId;
    list<Exam__c> eList = [SELECT Name,Titan__c,Id FROM Exam__c WHERE Titan__c=: titanId];
    list<Exam_Result__c> eRList = [SELECT Pass__c,	Graded__c,Name,Exam__c,Account__c FROM Exam_Result__c WHERE Pass__c =: true AND Account__c=: accId];
    list<Exam_Result__c> emptyList= new list<Exam_Result__c>();
   for(Exam_Result__c eR: eRList){
      for(Exam__c e : eList){
         if(eR.Exam__c== e.Id){
            emptyList.add(eR);
         }
      }
    }
    return emptyList;
   }
   @AuraEnabled(cacheable=true)
   public static list<Project__c> getProjectInfo(){            //Returns a users projects. For creating the automatic equivalency.
      id userId = UserInfo.getUserId();
      list<Project__c> pList = [SELECT User__c,Name,Id From Project__c WHERE User__c =: userId];
      return pList;
   }
   /*@AuraEnabled(cacheable=true)                            Turns out you cant do this. I was wondering why 1 dml statement hit the limit.
   public static void obtainExperience(Integer i){
      system.debug(i);
      id userId = UserInfo.getUserId();
      list<Skill__c> sList = [SELECT Assigments__c,Name,Titan__c, Skill_Breakdown__c,Skill_Type__c,Id FROM Skill__c WHERE Titan__c=: 'a0X5f000001vStqEAE' LIMIT 1];
      id titanSkill = sList[0].Id;
      list<Equivalency__c> eList = [SELECT Skill__c,Name,Skill_Equivalency__c,Id,User__c FROM Equivalency__c WHERE Skill__c=: titanSkill AND User__c =: userId];
      list<Equivalency__c> eListNew = new list<Equivalency__c>();
      for(Equivalency__c eq: eList){
         eq.Skill_Equivalency__c=i;
         eq.Name='apex worked 3';
         eListNew.add(eq);
      }
      update eListNew;
   }*/
}
