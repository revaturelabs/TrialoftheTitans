public with sharing class ExamResultsPoolPageController {
    //Grab all question for a given Exam result
    @AuraEnabled
    public static List<Exam_Pool_Assignment__c> getExamResultPools(/*Id examId */){

        //List<Exam_Pool_Assignment__c> epa = new List<Exam_Pool_Assignment__c>();

    /*  List<Exam__c> eql  =  [SELECT Id, Name, 
        (SELECT Question_Pool__c FROM Exam_Pools__r) 
        FROM Exam__c WHERE Id IN 
        (SELECT Exam__c FROM Exam_Pool_Assignment__c WHERE Exam__c = 'a085e000000GfC5AAK')];
        System.debug(eql);
    */
        List<Exam_Pool_Assignment__c> epa = [SELECT Name, Exam__c, Number_to_pull__c, Question_Pool__c, Question_Pool__r.Name
                                            FROM Exam_Pool_Assignment__c 
                                            WHERE Exam__c = 'a085e000000GfC5AAK'];
                                            System.debug(epa);

        
        
        return epa;
    }

    @AuraEnabled
    public static Map<Id,String> getExamResultAnswers(/*Id examResultsId, Id examId*/){

        /*List<Hero_Answer__c> hal = [SELECT Name, Exam_Question__c, Correct__c
                                    FROM Hero_Answer__c
                                    WHERE Exam_Result__c = :examResultsId];
                                    return hal;*/
        //List<Question_Assignment__c> qal = new List<Question_Assignment__c>();
        Map<Id,String> m1 = new Map<Id,String>();
        String examQuestion;
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
            for(Question_Assignment__c qa : [SELECT Exam_Question__c, Question_Pool__c, Question_Pool__r.Name
                                            FROM Question_Assignment__c 
                                            WHERE Exam_Question__c IN 
                                            (SELECT Exam_Question__c FROM Hero_Answer__c 
                                            WHERE Exam_Result__c = 'a075e000001fT4DAAU' AND Correct__c = True)]){                                             

            m1.put(qa.Exam_Question__c, qa.Question_Pool__r.Name);
            }                            
            System.debug(m1);
            return m1;
    }

}