/////////////////////////////////////////////////////
//
//  Name: AssessmentSetup
//  Author: Kameron Fincher
//  Description: Utility class to create new data for 
//	the Cohort Page and Trainer Hub. It is ideal to 
//	run UserAccountSetup.UserSetup prior to this.
//	It's also best to run Setup first, then associateCohort
//	and finally QCSetup
//	
///////////////////////////////////////////////////
public class AssessmentSetup {
    // Creates assement and hero assessment objects, associating them with existing heroes (accounts)
    @testVisible
    public static void Setup(){
        List<Assessment__c> assessmentList = new List<Assessment__c>();
        
        assessmentList.add(new Assessment__c(Name = 'One on One', Type__c='1-on-1', Description__c='A check-in and mock interview with Heroes'));
        assessmentList.add(new Assessment__c(Name = 'Project 0', Type__c='Project', Description__c='Heroes will model a business of their choosing with a Lightning app'));
        assessmentList.add(new Assessment__c(Name = 'Project 1', Type__c='Project', Description__c='Heroes will create an experience cloud site using Visualforce Pages'));
        assessmentList.add(new Assessment__c(Name = 'Project 2', Type__c='Project', Description__c='Heroes will create an experience cloud site using Aura Components, while implementing Sales Cloud and Service Cloud solutions'));
        assessmentList.add(new Assessment__c(Name = 'Coding Challenge', Type__c='Misc', Description__c='A general coding challenge to see where Heroes are programming-wise'));
        
        insert assessmentList;
        
        List<Account> userAccount = [SELECT Name, Team__c from Account]; 
        List<Hero_Assessment__c> heroAssessmentList = new List<Hero_Assessment__c>();
        
        for(Assessment__c a : assessmentList){
            for(Account acc : userAccount){
                if(acc.Team__c!=null){
                    Hero_Assessment__c tempHeroAssessment = new Hero_Assessment__c(Hero__c=acc.id,Assessment__c=a.id);
                    tempHeroAssessment.Overall_Score__c = Decimal.valueOf(Math.random()*50).setScale(2)+50;
                    heroAssessmentList.add(tempHeroAssessment);
                }
            }
        }
        
       insert heroAssessmentList;
        
    }
    // Uses most of the code from Alex's QCHubDataFactory controller
    @testVisible
    public static void QCSetup(String namePrefix){
        List<Account> testAcct = [SELECT Name, Team__c from Account];
        Schema.DescribeSObjectResult acctDesc = Account.SObjectType.getDescribe();
		Map<String, Schema.RecordTypeInfo> acctRecTypeMap = acctDesc.getRecordTypeInfosByName();
		Id heroTypeId = acctRecTypeMap.get('Hero').getRecordTypeId();
        
        Cohort__c testCohort = [Select Name from Cohort__c LIMIT 1];
        List<QC_Interview__c> QCInterviewList = new List<QC_Interview__c>();
        for (Account a : testAcct){
            a.RecordTypeId=heroTypeId = heroTypeId;
        	QC_Interview__c newInterview = new QC_Interview__c(Name=a.Name+'QC '+namePrefix,
                                                               Cohort__c=testCohort.Id, Account__c=a.Id);
            QCInterviewList.add(newInterview);
            
        }
        update testAcct;
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
    @testVisible
    public static void associateCohort(){
        Cohort__c coh = new Cohort__c(Name='4122021',Active__c=true);
        insert coh;
        List<Account> userAccount = [SELECT Name, Team__c from Account]; 
        for(Account acc : userAccount){
            acc.Cohort__c = coh.id;
        }
        update userAccount;
    }
}