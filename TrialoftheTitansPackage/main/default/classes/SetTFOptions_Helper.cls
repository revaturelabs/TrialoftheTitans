public with sharing class SetTFOptions_Helper {
    public static void setOptions(List<Exam_Question__c> questionList){
        for (Exam_Question__c ql : questionList){
            if (ql.Question_Type__c == 'True-false'){
                ql.Options__c = 'TRUE||FALSE';
            }
        }
    }
}
