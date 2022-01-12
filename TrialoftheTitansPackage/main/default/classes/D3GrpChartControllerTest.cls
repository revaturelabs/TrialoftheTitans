@isTest
public class D3GrpChartControllerTest {
    @isTest 
    static void testMap(){
        Curriculum__c curr=new Curriculum__c(Name='salesforce');
        insert curr;
        Cohort__c cohort=new Cohort__c(
        Name='Jan',
        Curriculum__c=curr.id);
        insert cohort;
        Account acc1=new Account(Name='clark1', Cohort__c=cohort.id);
        insert acc1;
        Account acc2=new Account(Name='clark2', Cohort__c=cohort.id);
        insert acc2;
        Assessment__c Assess=new Assessment__c(Name='test');
        insert Assess;
        Hero_Assessment__c hero1=new Hero_Assessment__c(
            Hero__c=acc1.Id,
            Assessment__c=Assess.Id,
            Overall_Score__c=60
        );
        insert hero1;
        Hero_Assessment__c hero2=new Hero_Assessment__c(
            Hero__c=acc2.Id,
            Assessment__c=Assess.Id,
            Overall_Score__c=70
        );
        insert hero2;
        System.debug(D3GrpChartController.getDataMap());
        Decimal score= D3GrpChartController.getDataMap().get('Jan')[0].grpValue;
        System.assertEquals(65,score);
    }
       
      public class grpBarChart {
        @AuraEnabled public String grpName;
        @AuraEnabled public Decimal grpValue;
         
        public grpBarChart( String grpName, Decimal grpValue ) {
            this.grpName = grpName;
            this.grpValue = grpValue;
        }
   }
}