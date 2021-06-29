/////////////////////////////////////////////////////
//
//  Name: CurrentCohortController
//  Author: Kameron Fincher
//  Description: Controller used to grab data for  
//	QC Scores, Exams, and Hero Assessments. It only 
//	grabs the active cohort of the running user/trainer
//	
///////////////////////////////////////////////////
public class CurrentCohortController {
	@AuraEnabled
    public static List<Pair> getData(){
        List<Pair> pr = new List<Pair>();
        
        Id owner = UserInfo.getUserId();
        
        Cohort__c cohort = [SELECT Id, Name, Active__c, OwnerID FROM Cohort__c WHERE Active__c = true AND OwnerID = :owner LIMIT 1];
        Map<Id,Account> accountIds = new Map<ID, Account>([SELECT Id, Cohort__c FROM Account WHERE Cohort__r.Id = :cohort.id]);
        
        Map<String,Decimal> overallScores = new Map<String,Decimal>{'QC'=>0,'Exams'=>0,'Misc'=>0,'1-on-1'=>0,'Project'=>0};
        Map<String,Decimal> assessmentSize = new Map<String,Decimal>{'QC'=>0,'Exams'=>0,'Misc'=>0,'1-on-1'=>0,'Project'=>0};
            
        for(Exam_Result__c ex:[SELECT Exam__r.name, Score__c, Account__r.id FROM Exam_Result__c WHERE Account__r.id IN :accountIds.keySet()]){
            overallScores.put('Exams',overallScores.get('Exams')+ex.Score__c);
            assessmentSize.put('Exams',assessmentSize.get('Exams')+1);
        }
        
        for(Hero_Assessment__c ex:[SELECT Overall_Score__c, Assessment__r.Type__c, Hero__r.Id FROM Hero_Assessment__c WHERE Hero__r.Id IN :accountIds.keySet()]){
            overallScores.put(ex.Assessment__r.Type__c,overallScores.get(ex.Assessment__r.Type__c)+ex.Overall_Score__c);
            assessmentSize.put(ex.Assessment__r.Type__c,assessmentSize.get(ex.Assessment__r.Type__c)+1);
        }
        
        Integer QCMaxScore = 5; // using this to scale scores to 100
        
        // Using QC_Question_Answer__c until the QC_Interview__c has score calculated
        for(QC_Question_Answer__c ex:[SELECT Score__c, QC_Interview__r.Account__r.id FROM QC_Question_Answer__c WHERE QC_Interview__r.Account__r.id IN :accountIds.keySet()]){
            overallScores.put('QC',overallScores.get('QC')+(ex.Score__c*100/QCMaxScore));
            assessmentSize.put('QC',assessmentSize.get('QC')+1);
        }
        
        
        for(String oS : overallScores.keySet()){
            if(assessmentSize.get(oS)!=0){
                overallScores.put(oS,((overallScores.get(oS)/assessmentSize.get(oS)).setScale(2))); // set scale rounds
                pr.add(new Pair(oS,overallScores.get(oS)));
            }
        }

        return pr;
    }
    // Class used for mapping data retrieved into the right format for charts
    public class Pair{
        @AuraEnabled public String name;
        @AuraEnabled public Decimal value;
        public Pair(String name, Decimal value){
            this.name = name;
            this.value = value;
        }
    }
}