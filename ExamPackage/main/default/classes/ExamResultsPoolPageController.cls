public with sharing class ExamResultsPoolPageController {
    //Grab all question for a given Exam result
    @AuraEnabled
    public static List<String> getExamResultPools(/*Id examId */){

        List<String> numCorrectPoolAns = new List<String>();

    /*  List<Exam__c> eql  =  [SELECT Id, Name, 
        (SELECT Question_Pool__c FROM Exam_Pools__r) 
        FROM Exam__c WHERE Id IN 
        (SELECT Exam__c FROM Exam_Pool_Assignment__c WHERE Exam__c = 'a085e000000GfC5AAK')];
        System.debug(eql);
    */
        
        for(Question_Assignment__c qa : [SELECT Exam_Question__c, Question_Pool__c, Question_Pool__r.Name
        FROM Question_Assignment__c 
        WHERE Exam_Question__c IN 
        (SELECT Exam_Question__c FROM Hero_Answer__c 
        WHERE Exam_Result__c = 'a075e000001fT4DAAU')]){

            numCorrectPoolAns.add(qa.Question_Pool__r.Name);
        }
        return numCorrectPoolAns;
    }

    @AuraEnabled
    public static List<String> getExamResultAnswers(/*Id examResultsId */){

        /*List<Hero_Answer__c> hal = [SELECT Name, Exam_Question__c, Correct__c
                                    FROM Hero_Answer__c
                                    WHERE Exam_Result__c = :examResultsId];
                                    return hal;*/
        //List<Question_Assignment__c> qal = new List<Question_Assignment__c>();
        List<String> numCorrectPoolAns = new List<String>();
        /*for(Hero_Answer__c hal : [SELECT Name, Exam_Question__c, Correct__c
                                    FROM Hero_Answer__c
                                    WHERE Exam_Result__c = 'a075e000001fT4DAAU' AND Correct__c = True LIMIT 5]){
                                        
        examQuestion = hal.Exam_Question__c;

            for(Question_Assignment__c qa : [SELECT Exam_Question__c, Question_Pool__c, Question_Pool__r.Name
            FROM Question_Assignment__c 
            WHERE Exam_Question__c = :examQuestion ]){

            m1.put(hal.Exam_Question__c, qa.Question_Pool__r.Name);
            }
            
            system.debug(m1);

            }  */
           
            /*
            Retrieve correct hero answers from the current exam results 
            where the respective exam question is also in a question pool base
            */
            for(Question_Assignment__c qa : [SELECT Exam_Question__c, Question_Pool__c, Question_Pool__r.Name
                                            FROM Question_Assignment__c 
                                            WHERE Exam_Question__c IN 
                                            (SELECT Exam_Question__c FROM Hero_Answer__c 
                                            WHERE Exam_Result__c = 'a075e000001fT4DAAU' AND Correct__c = True)]){

            numCorrectPoolAns.add(qa.Question_Pool__r.Name);
            }                            
            return numCorrectPoolAns;
    }

}