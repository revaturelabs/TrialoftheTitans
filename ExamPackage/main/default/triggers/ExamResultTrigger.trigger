trigger ExamResultTrigger on Exam_Result__c (before insert, before update) {
    switch on trigger.operationType{
        when BEFORE_INSERT{
            ExamTriggerHandler.AssignExams(trigger.new);
        }
    	when BEFORE_UPDATE{
            ExamTriggerHandler.AssignExams(trigger.new);
    	}
    }

}