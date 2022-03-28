public with sharing class ExamTriggerHelper {
    public static void makeResults(List<Exam__c> newExams){
        List<Id> titanIDs = new List<Id>();
        for(Exam__c exam : newExams){
            titanIDs.add(exam.Titan__c);
        }
        List<Titan__c> titans = [SELECT Id, Curriculum__c, Name  FROM Titan__c WHERE Id IN :titanIDs];
        //have a list of titans now

        List<Id> curriculumIDs = new List<Id>();  
        for(Titan__c titan : titans){
            curriculumIDs.add(titan.Curriculum__c);
        }
        List<Account> accounts = [SELECT Id, Curriculum__c, Name FROM Account WHERE Curriculum__c IN :curriculumIDs];
        //have a list of accounts now

        List<Exam_Result__c> resultsToInsert = new List<Exam_Result__c>();
        for(Exam__c exam : newExams){

            Titan__c currentTitan = new Titan__c();
            for(Titan__c titan : titans){
                if(exam.Titan__c == titan.Id){currentTitan = titan;}
            }

            for(Account acc : accounts){
                if(acc.Curriculum__c == currentTitan.Curriculum__c){
                    Exam_Result__c res = new Exam_Result__c();
                    res.Account__c = acc.Id;
                    res.Exam__c = exam.Id;
                    res.Status__c = 'Unassigned';
                    resultsToInsert.add(res);
                    System.debug('Inserting '+ exam.Name + ' '+ acc.Name);
                }
            }            
        }
        insert resultsToInsert;
    }

    
}
