@isTest
public with sharing class QuestionFlagUpdatesTest {
   
    @isTest static void flagTest() {
      
    //System.debug('flag test has started');
    Exam_Question__c eq = new Exam_Question__c();
    eq.IsFlagged__c= false;
    eq.Flag_Category__c 	= 'Other';
    eq.Flag_Notes__c 		= ' ';

	//System.debug('new question isflagged=false created');
          
    Test.startTest();
      
          try{
              //System.debug('try block started');
              insert eq;
              //System.debug('inserted eq');
              Exam_Question__c q = new Exam_Question__c();
        
            q = [SELECT Id, IsFlagged__c, Flag_Category__c, Flag_Notes__c FROM Exam_Question__c];
                
            QuestionFlagUpdates.lookupQuestion(q.Id);
            QuestionFlagUpdates.flagQuestion(q.Id, q.Flag_Category__c, q.Flag_Notes__c);
            //System.debug('method executed successfully');
          }
       catch(exception e){
           
           //System.debug('handled exception' + e);
       }
   	
       
    Test.stopTest();
  
       
   }  
}