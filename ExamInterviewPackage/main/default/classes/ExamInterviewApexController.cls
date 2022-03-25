/**
 * @name              : Exam Interview Apex Controller
 * @description       : Controller for our Exam Interview component.This will be      pulling the exam and questions for display in Exam.
 * @author            : Jayvious Williams, Daniel Boice, Trevor Kleinstuber, Conner Eilenfeldt
 * @group             : 
 * @last modified on  : 02-17-2022
 * @last modified by  : Conner Eilenfeldt
 * Modifications Log
 * Ver   Date         Author              Modification
 * 1.0   2021-06-26   Jayvious Williams   Initial Version
 * 1.1   2021-10-03   Daniel Boice
 * 1.2   2022-02-11   Trevor Kleinstuber  examFinder() corrected and improved
 * 1.3   02-17-2022   Conner Eilenfeldt   Added loading the exam details
**/

public without sharing class ExamInterviewApexController {
    // loads exam questions and details using examID
    @AuraEnabled(cacheable=true)
    public static List<List<SObject>> examFinder(String examID){

        /**Extract the question pools assigned to the exam */
        Exam_Pool_Assignment__c[] examPoolAssignments = [SELECT Id, Number_to_pull__c, Question_Pool__c FROM Exam_Pool_Assignment__c WHERE Exam__c =:examID];
        Set<ID> questionPools = new Set<ID>();
        //Integer numQuestions = 0;
        Boolean successfullyAdded = false;
        for(Exam_Pool_Assignment__c epa : examPoolAssignments) { 
            questionPools.add(epa.Question_Pool__c);
        }
        /*extract the questions in the question pool*/
        Question_Assignment__c[] questionAssignments = [SELECT Id, Exam_Question__c FROM Question_Assignment__c WHERE Question_Pool__c IN :questionPools];
        Set<ID> questionSet = new Set<ID>();
        for(Question_Assignment__c qa : questionAssignments) { 
            questionSet.add(qa.Exam_Question__c); 
        }

        List<Exam_Question__c> questionList = [SELECT Question_Text__c, Question_Type__c, Options__c, Correct_Answer_s__c FROM Exam_Question__c WHERE Id IN :questionSet];

        // Retreiving exam details
        List<Exam__c> examDetails = [SELECT id, Name, Default_Time_Limit__c, Titan__r.Name FROM Exam__c WHERE id = :examID LIMIT 1];

        List<List<SObject>> theExam = new List<List<SObject>>();
        theExam.add(questionList);
        theExam.add(examDetails);

        return theExam;


        /**DOES NOT CORRECTLY PICK THE ASSIGNED NUMBER OF QUESTIONS PER POOL*/     

    }

    // insert hero answers using answered exam questions
    @AuraEnabled
    public static Exam_Result__c submitExam(String examId, String acctId){
        System.debug('submitted exam');
        System.debug(examId);
        List<Exam_Result__c> examResult = new List<Exam_Result__c>();
        // inserts exam related to the hero that took it and updates the exam result
        //Exam__c submittedExam = [SELECT Id FROM Exam__c WHERE Id = :examId LIMIT 1];
       
        //Account account = [SELECT Id FROM Account WHERE Name = 'Gladius Maximus' LIMIT 1];
       // System.debug(account);
       
        examResult = [SELECT Id, Passing_Grade_Override__c, Exam__r.Default_Passing_Grade__c FROM Exam_Result__c WHERE Account__c = :acctId AND Status__c = 'Assigned' AND Exam__c = :examId];
        
        try{
        if(examResult!=null && examResult.size()>0){
            System.debug(examResult[0]);
            Exam_Result__c myExamResult = (Exam_Result__c) examResult[0];
            // myExamResult.Status__c = 'Completed';
            update myExamResult;
        }
        return examResult[0];
     }
        catch(Exception e){         
            throw new AuraHandledException(e.getMessage());
    }

    }

    // created a new list of hero answers that is the same size as the amount of questions
    @AuraEnabled
    public static void submitAnswers(List<Exam_Question__c> examQuestionList, Map<String, String> examAnswerList, String examId){
        System.debug('submit answers in apex controller');
        System.debug(examQuestionList);
        System.debug(examQuestionList.size());
        System.debug(examQuestionList[0]);
        System.debug(examAnswerList.keySet());
        System.debug(examAnswerList.size());
        List<Exam_Result__c> myExamList =[SELECT Id FROM Exam_Result__c ORDER BY lastModifiedDate DESC LIMIT 1];
        Exam_Result__c myExam;
        if (myExamList.size()>0){
            myExam=myExamList[0];
        }
        // creates and populates a list of hero answers that are the same size as the number of wuestions
        List<Hero_Answer__c> heroAnswers = new List<Hero_Answer__c>();
        for(integer i=0; i<examQuestionList.size(); i++){
           Hero_Answer__c myHeroAnswer =new Hero_Answer__c(Exam_Question__c=examQuestionList[i].Id, Answer_Choice__c=examAnswerList.get(String.valueOf(i+1)));
          
            
            myHeroAnswer.Exam_Result__c =myExam.Id;
            
           if(myHeroAnswer.Answer_Choice__c == examQuestionList[i].Correct_Answer_s__c){
                myHeroAnswer.Correct__c = true;
            }
            heroAnswers.add(myHeroAnswer);
            
        }
        insert heroAnswers; 
        //this needs to be reworked
        //Exam_Result__c examId = [SELECT Id FROM Exam_Result__c ORDER BY lastModifiedDate DESC LIMIT 1];
        // fills out fields for each hero answer in the hero aanswers list
        //for(integer i=0; i<heroAnswers.size(); i++){
           // heroAnswers[i].Exam_Question__c = examQuestionList[i].Id;
            //heroAnswers[i].Answer_Choice__c = examAnswerList.get(String.valueOf(i+1));
            //heroAnswers[i].Exam_Result__c = examId.Id;
            // if(ExamQuestionList[i].Question_Type__c == 'Multiple Choice - multiple answers') {
            //     //system.debug(examQuestionList[i]);
            //     Set<String> heroSet = new Set<String>(heroAnswers[i].Answer_Choice__c.split('||'));
            //     //system.debug(heroAnswers);
            //     Set<String> answerSet = new Set<String>(examQuestionList[i].Correct_Answer_s__c.split('||'));
            //     //system.debug(answerSet);
            //     if(heroSet.Equals(answerSet)){
            //         heroAnswers[i].Correct__c = true;
            //     }
            // }
            // else if(heroAnswers[i].Answer_Choice__c == examQuestionList[i].Correct_Answer_s__c){
            //     heroAnswers[i].Correct__c = true;
                
            // }
            
       // }
       
    }    
}