public class createAnswerUtil {
    public static void createAnswers(){
        List<Account>actList = [SELECT ID, NAME, Team__r.Name FROM ACCOUNT WHERE name = 'Some Wizard'];
        List<Exam_Question__c> questionList = [SELECT ID FROM Exam_Question__c];
        List<Exam__C> examList = [SELECT ID FROM Exam__c];
        List<Exam_Result__c> examResult = new List<Exam_Result__c>();
        List<Hero_Answer__c> answerList = new List<Hero_Answer__C>();
        List<AccResults> acctResults = new List<AccResults>();
         
        for(Account acct: actList){
            for(Exam__c exam: examList){
                Exam_Result__c newResult = new Exam_Result__c(Exam__c = exam.Id, Account__c = acct.Id, Graded__c =true, Status__c = 'Completed');
                examResult.add(newResult);
                AccResults newAcctResult = new AccResults(acct, newResult);
                acctResults.add(newAcctResult);
           	}
        }
        
        insert examResult; 
		
        for(AccResults acctResult: acctResults){
            for(Integer i = 0; i < 5; i++){
                Integer j = Integer.valueOf(Math.random()*questionList.size());
                Hero_Answer__c newAnswer = new Hero_Answer__c(Exam_Result__c = acctResult.result.Id, Exam_Question__c = questionList[j].Id);
                newAnswer.Correct__c = false;
                
                switch on i{
                    when 0,1 {
                        newAnswer.Correct__c = true;
                    }
                    when 2 {
                        if(acctResult.acct.Team__r.Name != 'Synergy'){
                            newAnswer.Correct__c = true;
                        }
                    }
                    when 3 {
                        if(acctResult.acct.Team__r.Name != 'Synergy' && acctResult.acct.Team__r.Name != 'Vanquish'){
                            newAnswer.Correct__c = true;
                        }
                    }
                    when 4 {
                        if(acctResult.acct.Team__r.Name == 'Alchemy'){
                            newAnswer.Correct__c = true;
                        }
                    }
                }
                answerList.add(newAnswer);
            }
        }
        insert answerList;
    }
    
    public class AccResults{
        public Account acct;
        public Exam_Result__c result;
        
        public AccResults(Account acct, Exam_Result__c result){
            this.acct = acct;
            this.result = result;
        }
    }
}