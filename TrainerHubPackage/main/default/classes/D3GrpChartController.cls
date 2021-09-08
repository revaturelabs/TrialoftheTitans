global without sharing class D3GrpChartController {
    @AuraEnabled
    public static Map<String, list<grpBarChart>> getDataMap() {
       Map<String, list<grpBarChart>> groupData=new Map<string, List<grpBarChart>>();
      
        List<Cohort__c> batchList=new List<Cohort__c>([Select Id, Name, Curriculum__r.Name from Cohort__c]);
        List<Hero_Assessment__c> heroAssessmentList=new List<Hero_Assessment__c>([SELECT Id, Hero__r.cohort__r.Name, Hero__r.cohort__r.curriculum__r.name, Overall_Score__c FROM Hero_Assessment__c]);
        Set<String> filteredbatch=new Set<String>();
        
                             
        for(Cohort__c c: batchList){
           filteredbatch.add(c.Name);  
        }
        for(String c: filteredbatch){
            List<grpBarChart> grpList=new List<grpBarChart>();
            
            
            for(Cohort__c cohort: batchList){
                Integer num=0;
                Decimal total=0;
                if(cohort.Name==c){
                    String Name= cohort.Curriculum__r.Name;
                    for (Hero_Assessment__c ha : heroAssessmentList){
                        if (ha.Hero__r.cohort__r.Name==c && ha.Hero__r.cohort__r.curriculum__r.name==Name){
                            num++;
                            total+=ha.Overall_Score__c;
                        }
                    }
                    if(num!=0){
                    Decimal avg=total/num;
                    grpList.add(new grpBarChart(Name, avg));  
                    }else{
                      grpList.add(new grpBarChart(Name, 0));   
                    }
                     
                }
            }
            groupData.put(c, grpList); 
        }
        return groupData;
      }
       
    //Wrapper class
     public class grpBarChart {
        @AuraEnabled public String grpName;
        @AuraEnabled public Decimal grpValue;
         
        public grpBarChart( String grpName, Decimal grpValue ) {
            this.grpName = grpName;
            this.grpValue = grpValue;
        }
   }
}