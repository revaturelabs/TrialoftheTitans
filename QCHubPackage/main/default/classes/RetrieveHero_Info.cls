public with sharing class RetrieveHero_Info {
    
    public class QCInterviewWrapper {

        @AuraEnabled        
        public Id QCInterviewId {get;set;}

        @AuraEnabled
        public Cohort__c objCohort {get;set;}

        @AuraEnabled
        public Account objHero {get;set;}

        @AuraEnabled
        public Boolean isActive {get;set;}
        
        public QCInterviewWrapper(Id id, String name, Boolean active) {
            QCInterviewId = id;
            objCohort = new Cohort__c();
            objHero = new Account();
            isActive = active;
        }
    }

    public class Wrapper{
        @AuraEnabled public String cohortId {get; set;}
        @AuraEnabled public String cohortName {get; set;}
        @AuraEnabled public String heroId {get; set;}
        @AuraEnabled public String heroName {get; set;}
        @AuraEnabled public String weekName {get; set;}
        @AuraEnabled public String qcInterviewId {get; set;}

    }

    public class MasterWrapper{
        @AuraEnabled public Map<String, List<Wrapper>> mapCohortNameVsWrapper {get;set;}
        @AuraEnabled public Set<String> cohortNames {get;set;}
        @AuraEnabled public Set<String> setWeeks {get;set;}
        @AuraEnabled public List<QC_Question_Deck__c> allQuestionDeckWithQuestions {get; set;}

        public MasterWrapper(){
            mapCohortNameVsWrapper = new Map<String, List<Wrapper>>();
            cohortNames = new Set<String>();
            setWeeks =  new Set<String>();
            allQuestionDeckWithQuestions = new List<QC_Question_Deck__c>();
        }
    }

    @AuraEnabled
    public static MasterWrapper getData(){
        MasterWrapper wrap = new MasterWrapper();
        Map<String, List<Wrapper>> mapCohortNameVsWrapper = new Map<String, List<Wrapper>>();
        Set<String> cohortNames = new Set<String>();
        for(QC_Interview__c qcInterviews: [SELECT Id, Week__c,Cohort__c,Cohort__r.Name, Cohort__r.Active__c,
                                         Account__c, Account__r.Name FROM QC_Interview__c ]){
            if(null != qcInterviews.Cohort__c && null != qcInterviews.Account__c &&  qcInterviews.Cohort__r.Active__c){
                List<Wrapper> listWrapper = new List<Wrapper>();
                if(mapCohortNameVsWrapper.containsKey(qcInterviews.Cohort__r.Name)){
                    listWrapper.addAll(mapCohortNameVsWrapper.get(qcInterviews.Cohort__r.Name));
                }
                Wrapper obj = new Wrapper();
                obj.cohortId = qcInterviews.Cohort__c;
                obj.cohortName = qcInterviews.Cohort__r.Name;
                obj.heroId = qcInterviews.Account__c;
                obj.heroName = qcInterviews.Account__r.Name;
                obj.weekName = qcInterviews.Week__c;
                obj.qcInterviewId = qcInterviews.Id;
                listWrapper.add(obj);
                cohortNames.add(qcInterviews.Cohort__r.Name);
                mapCohortNameVsWrapper.put(qcInterviews.Cohort__r.Name, listWrapper);
            }
        
        }
        wrap.cohortNames = cohortNames;
        wrap.mapCohortNameVsWrapper = mapCohortNameVsWrapper;
        wrap.setWeeks = getWeekPickListValues();
        wrap.allQuestionDeckWithQuestions = getQuestionDeckWithQuestions();
        return wrap;
    }

    @AuraEnabled
    public static List<QC_Question_Deck__c> getQuestionDeckWithQuestions(){
        List<QC_Question_Deck__c> listQuestionDecks = new List<QC_Question_Deck__c>();
        listQuestionDecks = [Select Id, Name, Week__c,
        (Select Id,Name , Question_Body__c, Expected_Answer__c from QC_Questions__r) 
        from QC_Question_Deck__c];

        return listQuestionDecks;
        
    }

    @AuraEnabled
    public static QC_Question_Deck__c getQuestionDeckAndQuestions(String weekName){
        QC_Question_Deck__c questionDeck = new QC_Question_Deck__c();
        questionDeck = [Select Id, Name, Week__c,
        (Select Id,Name , Question_Body__c, Expected_Answer__c from QC_Questions__r LIMIT 1) 
        from QC_Question_Deck__c Where Week__c =: weekName LIMIT 1];

        return questionDeck;
        
    }

    @AuraEnabled 
    public static void submitTheAnswer(String qcInterviewId, String answer, String question){
        try {
            QC_Question_Answer__c qa= new QC_Question_Answer__c();
            //qa.Name = 'Test';
            qa.Hero_Answer__c = answer;
            qa.QC_Interview__c = qcInterviewId;
            qa.Question__c = question;
            qa.Score__c = 20;
            System.debug('#### qa = '+ qa);
            insert qa;
        } catch (Exception e) {
            System.debug('#### error = '+ e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
    }


    public static Set<String> getWeekPickListValues(){
        Set<String> pickListValuesList= new Set<String>();
        Schema.DescribeFieldResult fieldResult = QC_Interview__c.Week__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            pickListValuesList.add(pickListVal.getLabel());
        }  
        System.debug('### pickListValuesList = '+ pickListValuesList);
        return pickListValuesList;
     }


   /*  @AuraEnabled
    public static Map<Integer, List<QCInterviewWrapper>> getActiveCohorts(){   
        
        Map<Integer, List<QCInterviewWrapper>> cohmap = new Map<Integer, List<QCInterviewWrapper>>();

        List<QCInterviewWrapper> cQCw = new List<QCInterviewWrapper>();

        Integer index = 1;
        Integer counter = 1;

        for(Cohort__c ch: [SELECT Id ,Name, Active__c FROM Cohort__c WHERE Active__c = TRUE]){
            cQCw.add(new QCInterviewWrapper(ch.Id , ch.Name, ch.Active__c));
            cohmap.put(index, cQCw);
            cQCw = new List<QCInterviewWrapper>();      
            counter++;
        }
        if(!cQCw.isEmpty()){
            cohmap.put(index, cQCw);
        }
        
        return cohmap;

    }
    @AuraEnabled
    public static List<Account> GetHerosforEachCohort(Id QCInterviewId){
        
        List<Account> cohortHeros  = new List<Account>();
        
        for(QC_Interview__c heros: [SELECT Id, Cohort__c, Account__r.Name
                                 FROM QC_Interview__c WHERE Cohort__c = :QCInterviewId]){
                                     // put the heros in to the list
                                     cohortHeros.add(new Account(Name = heros.Account__r.Name));
        }
        return cohortHeros;
    } */





 
/*     public Map<Id, QCInterviewWrapper> selectedCohort{
        get{
            if(selectedCohort == null){
                selectedCohort = new Map<id, QCInterviewWrapper>();
             /*    Cohort__c showCohort  = [SELECT Name , Active__c FROM Cohort__c WHERE Active__c = TRUE];
                selectedCohort.put(new QCInterviewWrapper(showCohort));  
                            }
            return selectedCohort;
        }
        private set;     
    }
  
    public List<QCInterviewWrapper> activeCohortMembers{
        get{
            if(activeCohortMembers==null){
                activeCohortMembers = new List<QCInterviewWrapper>();
                for(Account myWeeks : [SELECT Id, Name FROM Account]){
                    activeCohortMembers.add(new QCInterviewWrapper(activeCohortMembers.get(myWeeks.Id),activeCohortMembers.get(myWeeks.Name)));

                  //  this.wrapperList.add(new MyWrapper(conMap.get(ocr.ContactId),oppMap.get(ocr.OpportunityId)));
                }
            }
            return activeCohortMembers;
        }
        set;          
    }
    */

  
  /*   public static QCInterviewWrapper pickedCohort(String pickedCohort){

        pickedCohort = this.selectedCohort;
        pickedCohort.clear();

        for (QCInterviewWrapper cl : activeCohort){
            pickedCohort.put(cl.cohortMembers.Id, cl);
        }
        if(pickedCohort.size() > 1){
            return pickedCohort;
        }else{
            System.debug('error');
            return null;
        }    
    } */







 /*    @AuraEnabled
    public static QCInterviewWrapper getQCWeeks(String cohortStr){

            Schema.DescribeSObjectResult acctDesc = Account.SObjectType.getDescribe();
            Map<String, Schema.RecordTypeInfo> acctRecTypeMap = acctDesc.getRecordTypeInfosByName();
            Id heroTypeId = acctRecTypeMap.get('Hero').getRecordTypeId();

            Cohort__c cohort = (Cohort__c) JSON.deserialize(cohortStr, Cohort__c.class);
            
            List<Account> weekList =  [SELECT Name, QC_Interview__r.Week__c FROM Account WHERE RecordTypeId=:heroTypeId AND Cohort__r.Name=:cohort.Name];

            Map<String, List<Account>> squadMap = new Map<String, List<Account>>();

            for (Account hero : weekList){
                String currentHeroSquad = hero.Squad__r.Name;
                if (squadMap.containsKey(currentHeroSquad)){
                    squadMap.get(currentHeroSquad).add(hero);
                }
                else (squadMap.put(hero.Squad__r.Name, new List<Account>{hero}));
    
            }
            QCInterviewWrapper cohortData = new QCInterviewWrapper();
            cohortData.cohort = cohort;
            cohortData.squadList = squadMap;
    
            return cohortData;

            }
            @AuraEnabled
            public static QC_Interview__c saveQC_Iterview(QC_Interview__c interview){
                // Perform isUpdateable() checking first, then
                insert interview;
                return interview;
                }    */
}