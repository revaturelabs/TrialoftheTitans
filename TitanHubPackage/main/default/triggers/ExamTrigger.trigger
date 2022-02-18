trigger ExamTrigger on Exam__c (after insert) {
    switch on trigger.operationType {
        when AFTER_INSERT {
            ExamTriggerHelper.makeResults(trigger.new);
        }
    }
}