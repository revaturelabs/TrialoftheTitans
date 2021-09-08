public class QCHubController {
    
    @AuraEnabled
    public static List<Cohort__c> getData(){
       
         List<Cohort__c> cohortData = [SELECT Id, Name, Curriculum__r.Name FROM Cohort__c];
       


        return cohortData;

    }
     
    // public class PieChart {
    //     @AuraEnabled public String name;
    //     @AuraEnabled public Integer curriculum;
         
    //     public PieChart( String name, Integer curriculum ) {
    //         this.name = name;
    //         this.curriculum = curriculum;
    //     }
    // }
        


}