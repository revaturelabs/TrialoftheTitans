public with sharing class TitanDataFactory {
    public static void dataFactory() {

        List<Titan__c> titans = new List<Titan__c>();
        for(Integer i = 0; i < 100; i++) {
            Titan__c titan = new Titan__c(Name = 'Titan Number' + i, Technology__c = 'Java');
            titans.add(titan);
        }
        insert titans;
    }
}
