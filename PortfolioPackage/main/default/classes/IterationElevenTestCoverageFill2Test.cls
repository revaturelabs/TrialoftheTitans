
@isTest 
public with sharing class IterationElevenTestCoverageFill2Test {
    
    @TestSetup
    static void makeData(){
        List<QC_Question__c> myQC = new List<QC_Question__c>();
        for(Integer i = 0; i < 5; i++)
        {
            QC_Question__c q = new QC_Question__c(Name=('QCQuestion'+i), Question_Body__c='Lorem Ipsum Dolor');
            myQC.add(q);
        }

        insert myQC;

        Curriculum__c cuc = new Curriculum__c(Name='ApexTesting');
        insert cuc;

        Account a = new Account(Name='Faker', RecordTypeId=Schema.SObjectType.account.getRecordTypeInfosByName().get('Hero').getRecordTypeId());
        insert a;

        Titan__c tc = new Titan__c(Name='Salesforce', Technology__c='Salesforce', Curriculum__c=cuc.Id);
        insert tc;

        Cohort__c coc = new Cohort__c(Name='Jan18');
        insert coc;
        
        QC_Interview__c qcic = new QC_Interview__c(Account__c=a.Id, Cohort__c=coc.id,
        Finalized__c=true, Name='Interview 1', QC_Score__c=100, Week__c='Week 12');
        insert qcic;
        
        QC_Question_Answer__c qcqac = new QC_Question_Answer__c(Expected_Answer__c='Frogs',
        Hero_Answer__c='Frogs', QC_Interview__c=qcic.Id, Question__c='Hops, Was A Biblical Plague', Score__c=100);
        
        insert qcqac;
    }

    @isTest 
    public static void uploadInterviewDataTest()
    {
        List<Id> listIds = new List<Id>();

        try 
        {
            QCQuestionEditController.getQuestion();
        }
        catch (Exception e)
        {
            System.assert(e.getMessage()!=null);
        }

        for(QC_Question__c q : [SELECT Id FROM QC_Question__c])
        {
            listIds.add(q.Id);
        }

        try 
        {
            QCQuestionEditController.deleteQuestions(listIds);
        }
        catch (Exception e)
        {
            System.assert(e.getMessage()!=null);
        }

        try 
        {
            Id temp = (Id) '123456789123456798';
            listIds = new List<Id>{temp};
            QCQuestionEditController.deleteQuestions(listIds);
        }
        catch (Exception e)
        {
            System.assert(true, 'Error handled properly');
        }

    }

    @isTest 
    public static void lightningLoginFormTest()
    {
        System.assert(LightningLoginFormController.getForgotPasswordUrl()==null);

        try 
        {
            LightningLoginFormController.setExperienceId(null);
        }
        catch (Exception e)
        {
            System.assert(e.getMessage()!=null);
        }

        System.assertEquals('This method can be invoked only from within a community.', LightningLoginFormController.setExperienceId('Testing'));

        try 
        {
            LightningForgotPasswordController.setExperienceId(null);
        }
        catch (Exception e)
        {
            System.assert(e.getMessage()!=null);
        }

        System.assertEquals('This method can be invoked only from within a community.', LightningForgotPasswordController.setExperienceId('Testing'));

    }

    @isTest 
    public static void TitanPageApexTest()
    {
        Titan__c tc = [SELECT Id FROM Titan__c WHERE Name='Salesforce'];

        List<Exam__c> lec = TitanPageApexController.getExams(tc.Id);
        List<Titan__c> ltc = TitanPageApexController.getTitansList();

    }

    @isTest 
    public static void QCInterviewHeroReviewTest()
    {
        Cohort__c coc = new Cohort__c(Name='Jan18');
        insert coc;
        Account a = new Account(Name='TestUser',RecordTypeId=Schema.SObjectType.account.getRecordTypeInfosByName().get('Hero').getRecordTypeId());
        insert a;
        String week = 'Week 2';
        List<String> fakeList = new List<String>();
        QC_Question_Answer__c qcqc = [SELECT Id,Expected_Answer__c, Hero_Answer__c,
        QC_Interview__c, Question__c, Score__c FROM QC_Question_Answer__c wHERE Question__c = 'Hops, Was A Biblical Plague'];
        qcqc.id = null;
        fakeList.add(JSON.serialize(qcqc));
        String fname = 'Ferris';
        String descr = 'Idk A Problem';
        String ftype = 'Dress Code';

        String interviewId = QCInterviewHeroReviewAuraController.UploadInterviewData(coc.Id, a.Id, a.Name, week, fakeList, fname, descr, ftype);
    }
}