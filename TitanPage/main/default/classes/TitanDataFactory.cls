/*

  Title: TitanDataFactory
  Author: Christopher Thomas-Dukes
  Created date: 10/16/2021
  Description: Apex class to create Titan records for demonstration
  Modified date: 10/19/2021
  Modified by: Christopher Thomas-Dukes

*/

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
