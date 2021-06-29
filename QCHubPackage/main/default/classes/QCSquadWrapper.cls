//////////////////////////////////////////////////////////////////////////////
//
//  Name: QCCohortWrapper
//  Author: Alexander Dzhitenov
//  Description: 
//
//////////////////////////////////////////////////////////////////////////////

public class QCSquadWrapper {
    
    @AuraEnabled public Squad__c squad{get;set;}
    @AuraEnabled public List<Account> heroes{get;set;}

    public QCSquadWrapper(Squad__c s){
        this.squad = s;
        this.heroes = new List<Account>();
    }

}
