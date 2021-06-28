/////////////////////////////////////////////////////////////////////////////
//
//	Name: QCHubDataFactory
//	Author: Alexander Dzhitenov
//	Description: Creates data for testing functionality related to the
//				 QC App.
//
/////////////////////////////////////////////////////////////////////////////

public class QCHubDataFactory {
    
    // Create a cohort of 20 heroes. Create a QC Interview for each hero, and create 5 questions scored from 0-4 for
    // each interview.
    // cohortName: Name of the cohort.
    // namePrefix: Each hero created has a name from 0-19, prefixed with namePrefix.
    
    public static void dataFactory(String cohortName, String namePrefix){
        Cohort__c testCohort = new Cohort__c(Name=cohortName);
        insert testCohort;
        
        Schema.DescribeSObjectResult acctDesc = Account.SObjectType.getDescribe();
		Map<String, Schema.RecordTypeInfo> acctRecTypeMap = acctDesc.getRecordTypeInfosByName();
		Id heroTypeId = acctRecTypeMap.get('Hero').getRecordTypeId();
        
        List<Account> testAcct = new List<Account>();
        
        for (integer acctNum=0; acctNum<20; ++acctNum){
            Account a = new Account(Name=namePrefix+String.valueOf(acctNum), RecordTypeId=heroTypeId, Cohort__c=testCohort.Id);
            testAcct.add(a);
            
        }
        
        insert testAcct;
        
        List<QC_Interview__c> QCInterviewList = new List<QC_Interview__c>();
        for (Account a : testAcct){
        	QC_Interview__c newInterview = new QC_Interview__c(Name=a.Name+'QC '+namePrefix,
                                                               Cohort__c=testCohort.Id, Account__c=a.Id);
            QCInterviewList.add(newInterview);
            
        }
        
		insert QCInterviewList;
        
        List<QC_Question_Answer__c> QCAnswersList = new List<QC_Question_Answer__c>();
        for (QC_Interview__c QCInt : QCInterviewList){
            for (integer qcAnsCount=0; qcAnsCount<5; ++qcAnsCount){
                QC_Question_Answer__c qcAns = new QC_Question_Answer__c(Question__c='Question: ',Hero_Answer__c='Answer: ',
                                                                        Score__c=qcAnsCount, QC_Interview__c=QCInt.Id);
                QCAnswersList.add(qcAns);
                
            }
            
        }
        
        insert QCAnswersList;
        
    }
    
}

/*
List<Squad__c> Squads = new List<Squad__c>([SELECT Name, Id FROM Squad__c]);
List<Team__c> Teams = new List<Team__c>([SELECT Name, Id FROM Team__c]);

Map<String, Id> SquadMapId = new Map<String, Id>();
Map<String, Id> TeamMapId = new Map<String, Id>();

for (Squad__c squad : Squads){
    SquadMapId.put(squad.Name, squad.Id);
}

for (Team__c team : Teams){
    TeamMapId.put(team.Name, team.Id);
}

integer count = 0;
for (Account Hero : updateList){
    if (count<5){
        Hero.Team__c = teamMapId.get('Vanquish');
        Hero.Squad__c = squadMapId.get('Code Sourcerers');
    }
    else if (count<10){
        Hero.Team__c = teamMapId.get('Amplifire');
        Hero.Squad__c = squadMapId.get('Hello World');
    }
    else if (count<15){
        Hero.Team__c = teamMapId.get('Alchemy');
        Hero.Squad__c = squadMapId.get('Lead Team');
    }
    else if (count<20){
        Hero.Team__c = teamMapId.get('Synergy');
        Hero.Squad__c = squadMapId.get('Soars');
    }
}

*/